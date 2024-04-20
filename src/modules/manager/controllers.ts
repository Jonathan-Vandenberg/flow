import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import managerService from './services';

/**
 * Get managers by organisation ID
 */
export const getManagersByOrgIdController = async (req: Request, res: Response) => {
    const { organisationId } = req.params
    try {
        const data = await managerService.getManagersByOrgId(organisationId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get managers by organisation ID - ' + e.message);
    }
};

/**
 * Get manager by ID
 */
export const getManagerByIdController = async (req: Request, res: Response) => {
    const { managerId } = req.params;
    try {
        const data = await managerService.getManagerById(managerId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Unexpected error. Could not get manager by ID' + e.message);
    }
};

/**
 * Create manager by ID
 */
export const createManagerController = async (req: Request, res: Response) => {
    const { organisationId,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
    } = req.body;

    const createManagerData = {
        organisationId,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
    }
    try {
        const data = await managerService.createManager(createManagerData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
 * Update manager by ID
 */
export const updateManagerController = async (req: Request, res: Response) => {
    const { id,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl} = req.body;

    const updateManagerData = {
        id,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
    }
    try {
        const data = await managerService.updateManager(updateManagerData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
