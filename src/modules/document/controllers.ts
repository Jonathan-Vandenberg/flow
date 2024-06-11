import {logger} from "../../utils/logger";
import { Request, Response } from 'express';
import documentService from './services'

/**
 * Get documents by directory ID
 */
export const getDocsByDirectoryIdController = async (req: Request, res: Response) => {
    const { directoryId } = req.params;

    try {
        const data = await documentService.getDocsByDirectoryId(directoryId);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

export const getDocController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const data = await documentService.getDoc(id);
        console.log('data', data)
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

export const createDocController = async (req: Request, res: Response) => {
    const { directoryId, name, description, url } = req.body;
    const createData= { directoryId, name, description, url }

    try {
        const data = await documentService.createDoc(createData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

export const updateDocController = async (req: Request, res: Response) => {
    const { id,
    name,
    description,
    url, status } = req.body;

    const updateData  = {
        id, name, description, url, status
    }

    try {
        const data = await documentService.updateDoc(updateData);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Server error');
        console.log('ERROR::updateDocController: ' + e.message)
    }
};
