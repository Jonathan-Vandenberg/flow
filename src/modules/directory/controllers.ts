import {logger} from "../../utils/logger";
import { Request, Response } from 'express';
import directoryService from './services'

/**
 * Get StudentDocs by student ID
 */
export const getDirsByStudentIdController = async (req: Request, res: Response) => {
    const { studentId } = req.params;

    try {
        const data = await directoryService.getDirsByStudentId(studentId);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

export const getDirController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const data = await directoryService.getDir(id);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

export const createDirController = async (req: Request, res: Response) => {
    const { studentId, requirementId } = req.body;

    try {
        const data = await directoryService.createDir(studentId, requirementId);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

export const updateDirController = async (req: Request, res: Response) => {
    const { id, studentId, status } = req.body;

    const updateDate = {
        id, studentId, status
    }

    try {
        const data = await directoryService.updateDir(updateDate);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
