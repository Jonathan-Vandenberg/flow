import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import studentService from './services';

/**
 * Get students by manager ID
 */
export const getAllStudentsByAgentIdController = async (req: Request, res: Response) => {
    const { agentId } = req.params
    try {
        const data = await studentService.getAllStudentsByAgentId(agentId);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get agents by manager ID - ' + e.message);
    }
};

/**
 * Get student by IO
 */
export const getStudentByIdController = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await studentService.getStudentById(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get agents by manager ID - ' + e.message);
    }
};

/**
 * Create student
 */
export const createStudentController = async (req: Request, res: Response) => {
    const {
            agentId,
            agencyId,
            organisationId,
            courseId,
            name,
            age,
            country,
            guardianMobile,
            guardianEmail,
            expAttendDate,
            gapYear,
            gapYearExplanation,
            previouslyRejected,
    } = req.body

    const createData = {
        agentId,
        agencyId,
        organisationId,
        courseId,
        name,
        age,
        country,
        guardianMobile,
        guardianEmail,
        expAttendDate,
        gapYear,
        gapYearExplanation,
        previouslyRejected,
    }

    try {
        const data = await studentService.createStudent(createData);
        return res.status(200).json(data);
    } catch (e: any) {
        res.status(500).send('Unexpected error. Could not create student - ' + e.message);
    }
};

/**
 * Update student
 */
export const updateStudentController = async (req: Request, res: Response) => {
    const {
        id,
        agentId,
        organisationId,
        name,
        age,
        country,
        guardianMobile,
        guardianEmail,
        expAttendDate,
        gapYear,
        gapYearExplanation,
        previouslyRejected,
        status
    } = req.body

    const updateData= {
        id,
        agentId,
        organisationId,
        name,
        age,
        country,
        guardianMobile,
        guardianEmail,
        expAttendDate,
        gapYear,
        gapYearExplanation,
        previouslyRejected,
        status
    }

    try {
        const data = await studentService.updateStudent(updateData);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not create student - ' + e.message);
    }
};
