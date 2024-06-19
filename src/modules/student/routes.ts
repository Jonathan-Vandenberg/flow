import express from 'express';
import {
    createStudentValidationRules,
    getAllStudentsByAgentIdValidationRules,
    getStudentByIdValidationRules,
    getStudentsByAgencyIdValidationRules,
    getStudentsByOrganisationIdValidationRules,
    updateStudentValidationRules
} from "./validation";
import {
    createStudentController,
    getAllStudentsByAgentIdController,
    getStudentByIdController, getStudentsByAgencyIdController, getStudentsByOrganisationIdController,
    updateStudentController
} from "./controllers";

const router = express.Router();

/**
 * Get all students by agent ID
 */
router.get(
    '/:agentId',
    getAllStudentsByAgentIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAllStudentsByAgentIdController
);

/**
 * Get student by ID
 */
router.get(
    '/id/:id',
    getStudentByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getStudentByIdController
);


/**
 * Get students by Organisations ID
 */
router.get(
    '/organisation-students/:id',
    getStudentsByOrganisationIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getStudentsByOrganisationIdController
);

/**
 * Get students by Agency ID
 */
router.get(
    '/agency-students/:agencyId',
    getStudentsByAgencyIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getStudentsByAgencyIdController
);

/**
 * Create student
 */
router.post(
    '/',
    createStudentValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createStudentController
);

/**
 * Update student
 */
router.patch(
    '/',
    updateStudentValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateStudentController
);

export default router;
