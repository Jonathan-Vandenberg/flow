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
        res.status(500).send('Server error');
    }
};

/**
 * Get user by ID
 */
export const getUserByEmailController = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const data = await userService.getUserByEmail(email);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
}

/**
 * Get users organisation by ID
 */
export const getUserByOrganisationIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await userService.getUserByOrganisationId(id);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};

/**
 * Create user
 */
export const createUserController = async (req: Request, res: Response) => {
    const {
        agencyId,
        managerId,
        organisationId,
        firstName,
        lastName,
        email,
        role,
        imageUrl,
        expertiseArea,
        country
    } = req.body;

    const createUserData = {
        agencyId,
        managerId,
        organisationId,
        firstName,
        lastName,
        email,
        role,
        imageUrl,
        expertiseArea,
        country
    }
    try {
        const data = await userService.createUser(createUserData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};

/**
 * Create user and organisation for new user
 */
export const createUserOrgController = async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        email,
        userCountry,
        orgName,
        orgCountry,
    } = req.body;

    const createUserOrgData = {
        firstName,
        lastName,
        email,
        userCountry,
        orgName,
        orgCountry,
    }
    try {
        const data = await userService.createUserOrg(createUserOrgData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};

/**
 * Update user by ID
 */
export const updateUserController = async (req: Request, res: Response) => {
    const {
        id,
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
        country
    } = req.body;

    const updateUserData = {
        id,
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
        country
    }
    try {
        const data = await userService.updateUser(updateUserData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error');
    }
};
