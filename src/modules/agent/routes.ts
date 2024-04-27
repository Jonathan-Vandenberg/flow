import express from 'express';
// import { isAuthenticated, isValidationResult } from '../../middleware';
import {
    createAgentValidationRules,
    getAgentByIdValidationRules, getAgentsByAgencyIdValidationRules,
    updateAgentValidationRules
} from "./validation";
import {
    createAgentController,
    getAgentByIdController, getAgentsByAgencyIdController,
    updateAgentController
} from "./controllers";

const router = express.Router();

/**
 * Get agents by manager ID
 */
router.get(
    '/:agencyId',
    getAgentsByAgencyIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgentsByAgencyIdController
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
