import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import requirementService from './services';

/**
 * Get requirements by organisation ID
 */
export const getRequirementsByOrgIdController = async (req: Request, res: Response) => {
    const { organisationId } = req.params
    try {
        const data = await requirementService.getRequirementsByOrgId(organisationId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get requirements by organisation ID - ' + e.message);
    }
};

/**
 * Get requirements by course ID
 */
export const getRequirementsByCourseIdController = async (req: Request, res: Response) => {
    const { courseId } = req.params
    try {
        const data = await requirementService.getRequirementsByCourseId(courseId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get requirements by organisation ID - ' + e.message);
    }
};

/**
 * Get requirements by student ID
 */
export const getRequirementsByStudentIdController = async (req: Request, res: Response) => {
    const { studentId } = req.params
    try {
        const data = await requirementService.getRequirementsByStudentId(studentId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get requirements by course ID - ' + e.message);
    }
};

/**
 * Get requirement by ID
 */
export const getRequirementByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await requirementService.getRequirementById(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Unexpected error. Could not get requirement by ID' + e.message);
    }
};

/**
 * Create requirement by ID
 */
export const createRequirementController = async (req: Request, res: Response) => {
    const { organisationId,
        studentId,
        courseIds,
        name,
        details,
        type,
        countries,
        exampleImages,
    } = req.body;

    const createRequirementData = {
        organisationId,
        courseIds,
        studentId,
        name,
        details,
        type,
        countries,
        exampleImages,
    }
    try {
        const data = await requirementService.createRequirement(createRequirementData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
 * Update requirement by ID
 */
export const updateRequirementController = async (req: Request, res: Response) => {
    const { id,
        courseId,
        studentId,
        name,
        details,
        status,
        type,
        country
    } = req.body;

    const updateRequirementData = {
        id,
        courseId,
        studentId,
        name,
        details,
        status,
        type,
        country
    }
    try {
        const data = await requirementService.updateRequirement(updateRequirementData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
