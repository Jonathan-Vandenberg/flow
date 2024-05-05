import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import agencyService from './services';

/**
 * Get agencies by manager ID
 */
export const getAgenciesOnOrganisationsController = async (req: Request, res: Response) => {
    const { agencyId, organisationId } = req.body
    try {
        const data = await agencyService.getAgenciesOnOrganisations(agencyId, organisationId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get agencies by manager ID - ' + e.message);
    }
};

/**
 * Get agency by ID
 */
export const getAgencyByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await agencyService.getAgencyById(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Unexpected error. Could not get agency by ID' + e.message);
    }
};

/**
 * Create agency
 */
export const createAgencyController = async (req: Request, res: Response) => {
    const {
        organisationId,
        managerId,
        name,
        sector,
        country,
        district,
        market,
        commissionPercentage } = req.body;

    const createAgencyData = {
        organisationId,
        managerId,
        name,
        sector,
        country,
        district,
        market,
        commissionPercentage,
    }
    try {
        const data = await agencyService.createAgency(createAgencyData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
 * Update agency
 */
export const updateAgencyController = async (req: Request, res: Response) => {
    const { id,
        managerId,
        name,
        sector,
        country,
        district,
        market,
        commissionPercentage} = req.body;

    const updateAgencyData = {
        id,
        managerId,
        name,
        sector,
        country,
        district,
        market,
        commissionPercentage,
    }
    try {
        const data = await agencyService.updateAgency(updateAgencyData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
