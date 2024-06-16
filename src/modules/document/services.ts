import prisma from "../../../prisma/prisma";
import { S3 } from 'aws-sdk';
import {logger} from "../../utils/logger";
import {DirectoryStatus, DocStatus, Document, RequirementStatus, StudentStatus} from "@prisma/client";

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
                                id: true,
                                agent: {
                                    select: {
                                        id: true,
                                        firstName: true,
                                        lastName: true,
                                        imageUrl: true,
                                        managerId: true
                                    }
                                },
                                agency: {
                                    select: {
                                        id: true
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
        return {
            isValid: false,
            error: 'Failed to generate signed URL',
        };
    }
};

const createDoc = async (data: any) => {
    let document: Document | null = null;
    await prisma.$transaction(async (t) => {
        try {
            document = await t.document.create({
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
            });

            await t.directory.update({
                where: { id: data.directoryId },
                data: { status: DirectoryStatus.IN_PROGRESS },
            });

            await t.student.update({
                where: { id: data.studentId },
                data: { status: StudentStatus.PENDING },
            });
        } catch (e: any) {
            console.log(e.message);
        }
    });

    return { data: document, isValid: document !== null };
};

const updateDoc = async (data: any) => {
    let document: Document | null = null;
    try{
        await prisma.$transaction(async (t) => {
             document = await t.document.update({
                where: { id: data.id },
                data,
            });

            if (document) {
                const directory = await t.directory.findUnique({
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
                        },
                        student: {
                            select:{
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
                        await t.directory.update({
                            where: { id: directory.id },
                            data: { status: DirectoryStatus.COMPLETE },
                        });
                    } else {
                        await t.directory.update({
                            where: { id: directory.id },
                            data: { status: DirectoryStatus.IN_PROGRESS },
                        });
                    }

                    const studentDirectories = await t.directory.findMany({
                        where: { studentId: directory.student.id },
                        select: { status: true },
                    });

                    const allDirectoriesComplete = studentDirectories.every(
                        (dir) => dir.status === DirectoryStatus.COMPLETE
                    );

                    if (allDirectoriesComplete) {
                        await t.student.update({
                            where: { id: directory.student.id },
                            data: { status: StudentStatus.ACCEPTED },
                        });
                    } else {
                        await t.student.update({
                            where: { id: directory.student.id },
                            data: { status: StudentStatus.PENDING },
                        });
                    }
                }
            }
        })
    } catch(e: any){
        console.log('ERROR: ' + e.message)
    }

    return { data: document, isValid: !!document };
};

export default {
    getDocsByDirectoryId,
    getDoc,
    createDoc,
    updateDoc

}
