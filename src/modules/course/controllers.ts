import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import courseService from './services';

/**
 * Get courses by organisation ID
 */
export const getCoursesByOrgIdController = async (req: Request, res: Response) => {
    const { organisationId } = req.params
    try {
        const data = await courseService.getCoursesByOrgId(organisationId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get courses by organisation ID - ' + e.message);
    }
};

/**
 * Get course by ID
 */
export const getCourseByIdController = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
        const data = await courseService.getCourseById(courseId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e.message);
        res.status(500).send('Unexpected error. Could not get course by ID' + e.message);
    }
};

/**
 * Create course by ID
 */
export const createCourseController = async (req: Request, res: Response) => {
    const { organisationId,
        name,
        description
    } = req.body;

    const createCourseData = {
        organisationId,
        name,
        description
    }
    try {
        const data = await courseService.createCourse(createCourseData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};

/**
 * Update course by ID
 */
export const updateCourseController = async (req: Request, res: Response) => {
    const { id,
        name,
        description
    } = req.body;

    const updateCourseData = {
        id,
        name,
        description
    }
    try {
        const data = await courseService.updateCourse(updateCourseData);
        return res.status(200).json(data);
    } catch (e) {
        logger.info(e);
        res.status(500).send('Server error, check the backend');
    }
};
