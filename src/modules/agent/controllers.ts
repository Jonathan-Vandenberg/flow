import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import agentService from './services';

/**
 * Get agents by manager ID
 */
export const getAgentsByAgencyIdController = async (req: Request, res: Response) => {
    const { agencyId } = req.params
    try {
        const data = await agentService.getAgentsByAgencyId(agencyId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get agents by manager ID - ' + e.message);
    }
};

/**
 * Get user by ID
 */
export const getAgentByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await agentService.getAgentById(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Unexpected error. Could not get agent by ID' + e.message);
    }
};

/**
 * Get user by ID
 */
export const createAgentController = async (req: Request, res: Response) => {
    const { managerId,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
        expertiseArea } = req.body;

    const createAgentData = {
        managerId,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
        expertiseArea,
    }
    try {
        const data = await agentService.createAgent(createAgentData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
 * Get user by ID
 */
export const updateAgentController = async (req: Request, res: Response) => {
    const { id,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
        expertiseArea } = req.body;

    const updateAgentData = {
        id,
        firstName,
        lastName,
        email,
        mobile,
        imageUrl,
        expertiseArea,
    }
    try {
        const data = await agentService.updateAgent(updateAgentData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
