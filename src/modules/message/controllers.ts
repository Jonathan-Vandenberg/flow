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
    const messages = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).send('Invalid request. Messages must be an array.');
    }
    try {
        const data = await messageService.createMessage(messages);
        return res.status(200).json(data);
    } catch (e: any) {
        res.status(500).send('Unexpected error. Could not create message - ' + e.message);
    }
};

/**
 * Update group
 */
export const updateGroupController = async (req: Request, res: Response) => {
    const updateGroupData = req.body;
    if (!updateGroupData.memberIds || !Array.isArray(updateGroupData.memberIds)) {
        return res.status(400).send('Invalid request. memberIds must be an array.');
    }

    if(!updateGroupData.groupId){
        return res.status(400).send('Invalid request. groupId must be present.');
    }

    if(!updateGroupData.action){
        return res.status(400).send('Invalid request. Action must be present.');
    }

    try {
        const data = await messageService.updateGroup(updateGroupData);
        return res.status(200).json(data);
    } catch (e: any) {
        res.status(500).send('Unexpected error. Could not create group - ' + e.message);
    }
};
