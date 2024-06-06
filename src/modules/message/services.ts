import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import { Message} from "@prisma/client";

const getMessagesByDocumentId = async (documentId: string
) => {
    let messages: Message[] | null = null;

    try{
        messages = await prisma.message.findMany({
            where: {
                documentId
            },
            include: {
                sender: true,
                receiver: true,
                document: true
            }
        })
    } catch(e: any){
        logger.error('ERROR::getMessagesByDocumentId: Could not get messages by document ID: ' + e.message)
    }


    return {
        isValid : !!messages,
        data: messages
    };
};

const getMessagesByUserId = async (userId: string
) => {
    let messages: Message[] | null = null;

    try{
        messages = await prisma.message.findMany({
            where: {
                id: userId
            },
            include: {
                sender: true,
                receiver: true,
                document: true
            }
        })
    } catch(e: any){
        logger.error('ERROR::getMessagesByUserId: Failed to get messages by User ID: ' + e.message)
    }


    return {
        isValid: !!messages,
        data: messages
    };
};

const createMessage = async (data: any) => {
    let messages: Message[] = [];
    console.log('MESSAGES: ', data);

    await prisma.$transaction(async (t) => {
        try {
            for (const message of data) {
                console.log('MESSAGE: ', message);
                const createdMessage = await t.message.create({
                    data: {
                        content: message.content,
                        sender: {
                            connect: { id: message.senderId },
                        },
                        receiver: {
                            connect: { id: message.receiverId },
                        },
                        document: {
                            connect: { id: message.documentId },
                        },
                    },
                });
                messages.push(createdMessage);
            }
        } catch (e: any) {
            logger.error(`ERROR::createMessage: Failed to create messages: ` + e.message);
            throw e;
        }
    });

    return { data: messages, isValid: messages.length > 0 };
};

export default {
    getMessagesByDocumentId,
    getMessagesByUserId,
    createMessage,
}
