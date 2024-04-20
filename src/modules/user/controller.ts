import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import userService from './services';

/**
 * Check alias already exists
 */
export const checkAliasController = async (req: Request, res: Response) => {
    const { alias } = req.params;
    try {
        const data = await userService.checkUserAlias(alias);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, try again or contact support');
    }
};

/**
 * Get user by ID
 */
export const getUserByIdController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log('CONTROLLER USER ID: ', userId)
    try {
        const data = await userService.getUserById(userId);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, try again or contact support');
    }
};

/**
 * Get user by ID
 */
export const createUserController = async (req: Request, res: Response) => {
    const { name, role } = req.body;
    console.log(req)
    console.log('DATA CONTROLLER: ', name, role)
    try {
        const data = await userService.createUser(name, role);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, try again or contact support');
    }
};
