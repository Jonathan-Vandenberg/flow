import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import messageService from './services'

/**
 * Get messages by document Id
 */
export const getMessagesByDocumentIdController = async (req: Request, res: Response) => {
    const { documentId } = req.params
    try {
        const data = await messageService.getMessagesByDocumentId(documentId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get messages by document ID - ' + e.message);
    }
};

/**
 * Get messages by User Id
 */
export const getMessagesByUserIdController = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const data = await messageService.getMessagesByUserId(userId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get messages by user ID - ' + e.message);
    }
};

/**
 * Create message
 */
export const createMessageController = async (req: Request, res: Response) => {
    const {
        documentId,
        receiverId,
        senderId,
        content
    } = req.body

    const createData = {
        documentId,
        receiverId,
        senderId,
        content
    }

    try {
        const data = await messageService.createMessage(createData);
        return res.status(200).json(data);
    } catch (e: any) {
        res.status(500).send('Unexpected error. Could not create message - ' + e.message);
    }
};
