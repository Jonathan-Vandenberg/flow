import express from 'express';
import {
    createStudentValidationRules,
    getAllStudentsByAgentIdValidationRules,
    getStudentByIdValidationRules, updateStudentValidationRules
} from "./validation";
import {
    createStudentController,
    getAllStudentsByAgentIdController,
    getStudentByIdController,
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
