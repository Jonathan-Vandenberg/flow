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
    let messages: Message[] | null = null;
    console.log('MESSAGES: ', data)
    await prisma.$transaction(async (t) => {
        try {
            messages = [];
            for (const message of data) {
                console.log('MESSAGE: ', message)
                const createdMessage = await t.message.create({
                    data: {
                        content: message.content,
                        senderId: message.senderId,
                        receiverId: message.receiverId,
                        documentId: message.documentId,
                    },
                });
                messages.push(createdMessage);
            }
        } catch (e: any) {
            logger.error(`ERROR::createMessage: Failed to create messages: ` + e.message);
        }
    });
    return { data: messages, isValid: !!messages };
};

export default {
    getMessagesByDocumentId,
    getMessagesByUserId,
    createMessage,
}
