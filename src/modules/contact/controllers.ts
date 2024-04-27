import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import contactService from './services';

/**
 * Get contacts by agency ID
 */
export const getContactsByAgencyIdController = async (req: Request, res: Response) => {
    const { agencyId } = req.params
    try {
        const data = await contactService.getContactsByAgencyId(agencyId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get contacts by manager ID - ' + e.message);
    }
};

/**
 * Get contact by ID
 */
export const getContactByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await contactService.getContactById(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Unexpected error. Could not get contact by ID' + e.message);
    }
};

/**
 * Create contact
 */
export const createContactController = async (req: Request, res: Response) => {
    const { agencyId,
        name,
        email,
        mobile,
        role
    } = req.body;

    const createContactData = {
        agencyId,
        name,
        email,
        mobile,
        role,
    }
    try {
        const data = await contactService.createContact(createContactData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
 * Update contact
 */
export const updateContactController = async (req: Request, res: Response) => {
    const { id,
        agencyId,
        name,
        email,
        mobile,
         } = req.body;

    const updateContactData = {
        id,
        agencyId,
        name,
        email,
        mobile,
    }
    try {
        const data = await contactService.updateContact(updateContactData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
