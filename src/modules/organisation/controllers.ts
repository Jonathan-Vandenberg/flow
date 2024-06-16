import {logger} from "../../utils/logger";
import { Request, Response } from 'express';
import organisationService from './services'

/**
 * Create an Organisation
 */
export const createOrganisationController = async (req: Request, res: Response) => {
    const { name, country, ceo, imageUrl, userId, locations } = req.body;
    const organisationData = {
        name,
        country,
        ceo,
        imageUrl,
        userId,
        locations
    }
    try {
        const data = await organisationService.createOrganisation(organisationData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
* Get Organisation by Id
*/
export const getOrganisationByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await organisationService.getOrganisationById(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Server error, check the backend' + e.message);
    }
};

/**
 * Get users on organisations
 */
export const getUsersOnOrganisationsController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await organisationService.getUsersOnOrganisations(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Server error, check the backend' + e.message);
    }
};

/**
 * Get users on agencies
 */
export const getAgenciesOnOrganisationsController = async (req: Request, res: Response) => {
    const { id, userId } = req.params;
    try {
        const data = await organisationService.getAgenciesOnOrganisations(id, userId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Server error, check the backend' + e.message);
    }
};
