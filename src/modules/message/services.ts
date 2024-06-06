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
    let message: Message | null = null;
        try {
            message = await prisma.message.create({
                data: {
                    content: data.content,
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    documentId: data.documentId,
                },
            });
        } catch (e: any) {
            logger.error(`ERROR::createMessage: Failed to create message: ` + e.message);
        }
    return { data: message, isValid: !!message };
};

export default {
    getMessagesByDocumentId,
    getMessagesByUserId,
    createMessage,
}
