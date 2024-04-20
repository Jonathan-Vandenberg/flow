import {logger} from "../../utils/logger";
import { Request, Response } from 'express';
import organisationService from './services'

/**
 * Create an Organisation
 */
export const createOrganisationController = async (req: Request, res: Response) => {
    const { name, country, ceo, imageUrl } = req.body;
    const organisationData = {
        name,
        country,
        ceo,
        imageUrl,
    }
    try {
        const data = await organisationService.createOrganisation(organisationData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
