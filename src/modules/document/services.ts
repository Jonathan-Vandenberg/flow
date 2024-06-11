import prisma from "../../../prisma/prisma";
import { S3 } from 'aws-sdk';
import {logger} from "../../utils/logger";
import {DirectoryStatus, DocStatus, RequirementStatus} from "@prisma/client";

const s3 = new S3();

const getDocsByDirectoryId = async (directoryId: string
) => {
    const documents = await prisma.document.findMany({
        where: {
            directoryId
        }
    })

    return {
        isValid : !!documents,
        data: documents
    };
};

const getDoc = async (id: string) => {
    try {
        const document = await prisma.document.findUnique({
            where: { id },
            include: {
                directory: {
                    select: {
                        requirement: {
                            select: {
                                id: true
                            }
                        },
                        student: {
                            select: {
                                agent: {
                                    select: {
                                        id: true,
                                        firstName: true,
                                        lastName: true,
                                        imageUrl: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if(!document){
            return logger.error('GET_DOC_ERROR::No document found!')
        }
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: document.url,
            Expires: 3600, // URL expiration time in seconds
        };

        const signedUrl = await s3.getSignedUrlPromise('getObject', params);

        return {
            isValid: true,
            data: {
                ...document,
                signedUrl,
            },
        };
    } catch (error) {

        console.error(error);
        return {
            isValid: false,
            error: 'Failed to generate signed URL',
        };
    }
};

const createDoc = async (data: any) => {
    let document;

    try {
        document = await prisma.document.create({
            data: {
                directory: {
                    connect: {
                        id: data.directoryId,
                    },
                },
                url: data.url,
                name: data.name,
                description: data.description,
            },
            include: {
                directory: true,
                task: true,
            },
        });
    } catch (e: any) {
        console.log(e.message);
    }

    return {
        data: document,
        isValid: !!document?.id,
    };
};

const updateDoc = async (data: any) => {
    const document = await prisma.document.update({
        where: { id: data.id },
        data,
    });

    if (document) {
        const directory = await prisma.directory.findUnique({
            where: { id: document.directoryId },
            select: {
                id: true,
                documents: {
                    select: {
                        status: true
                    }
                },
                requirement: {
                    select: {
                        id: true
                    }
                }
            },
        });

        if (directory) {
            const allDocsComplete = directory.documents.every(
                (doc) => doc.status === DocStatus.COMPLETE
            );

            if (allDocsComplete) {
                await prisma.directory.update({
                    where: { id: directory.id },
                    data: {
                        status: DirectoryStatus.COMPLETE,
                    },
                });

                await prisma.requirement.update({
                    where: { id: directory.requirement.id },
                    data: {
                        status: RequirementStatus.PASSED,
                    },
                });
            } else {
                await prisma.directory.update({
                    where: { id: directory.id },
                    data: {
                        status: DirectoryStatus.IN_PROGRESS,
                    },
                });

                await prisma.requirement.update({
                    where: { id: directory.requirement.id },
                    data: {
                        status: RequirementStatus.REQUIRED,
                    },
                });
            }
        }
    }

    return { data: document, isValid: !!document };
};

export default {
    getDocsByDirectoryId,
    getDoc,
    createDoc,
    updateDoc

}
