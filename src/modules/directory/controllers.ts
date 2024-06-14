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
        res.status(500).send('Server error');
    }
};

export const getDirController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const data = await directoryService.getDir(id);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};

export const createDirController = async (req: Request, res: Response) => {
    const { studentId, requirementId } = req.body;

    try {
        const data = await directoryService.createDir(studentId, requirementId);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};

export const updateDirController = async (req: Request, res: Response) => {
    const { id, studentId, status } = req.body;

    const updateData = {
        id, studentId, status
    }

    try {
        const data = await directoryService.updateDir(updateData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};

export const deleteDirController = async (req: Request, res: Response) => {
    const { id, studentId, status } = req.body;

    const deleteData = {
        id, studentId, status
    }

    try {
        const data = await directoryService.deleteDir(deleteData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};
