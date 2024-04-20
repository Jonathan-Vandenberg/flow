import express from 'express';
// import { isAuthenticated, isValidationResult } from '../../middleware';
import {
    createAgentValidationRules,
    getAgentByIdValidationRules,
    getAgentsByManagerIdValidationRules,
    updateAgentValidationRules
} from "./validation";
import {
    createAgentController,
    getAgentByIdController,
    getAgentsByManagerIdController,
    updateAgentController
} from "./controllers";

const router = express.Router();

/**
 * Get agents by manager ID
 */
router.get(
    '/:managerId',
    getAgentsByManagerIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgentsByManagerIdController
);

/**
 * Get agent by ID
 */
router.get(
    '/id/:id',
    getAgentByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgentByIdController
);

/**
 * Create agent
 */
router.post(
    '/',
    createAgentValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createAgentController
);


/**
 * Update agent
 */
router.patch(
    '/',
    updateAgentValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateAgentController
);

export default router;
