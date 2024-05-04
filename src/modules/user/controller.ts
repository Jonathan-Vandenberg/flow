import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import userService from './services';

/**
 * Get user by ID
 */
export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await userService.getUserById(id);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, try again or contact support');
    }
};

/**
 * Get user by ID
 */
// export const getUserByEmailController = async (req: Request, res: Response) => {
//     const { email } = req.params;
//     try {
//         const data = await userService.getUserByEmail(email);
//         return res.status(200).json(data);
//     } catch (e) {
//         logger.info(e);
//         res.status(500).send('Server error, try again or contact support');
//     }
// }

/**
 * Get users organisation by ID
 */
export const getUsersByOrganisationIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await userService.getUsersByOrganisationId(id);
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
    const {
        agencyId,
        managerId,
        organisationId,
        firstName,
        lastName,
        email,
        mobile,
        role,
        imageUrl,
        expertiseArea,
    } = req.body;

    const createUserData = {
        agencyId,
        managerId,
        organisationId,
        firstName,
        lastName,
        email,
        mobile,
        role,
        imageUrl,
        expertiseArea,
    }
    try {
        const data = await userService.createUser(createUserData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, try again or contact support');
    }
};
