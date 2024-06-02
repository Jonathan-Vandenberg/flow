import prisma from "../../../prisma/prisma";
import { S3 } from 'aws-sdk';
import {logger} from "../../utils/logger";

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

        console.log(';signed URL', signedUrl)

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

const updateDoc = async (data: any
) => {
    const document = await prisma.document.update({
        where: {
            id: data.id
        },
        data
    })

    return {
        data: document,
        isValid: !!document
    }
};

export default {
    getDocsByDirectoryId,
    getDoc,
    createDoc,
    updateDoc

}
