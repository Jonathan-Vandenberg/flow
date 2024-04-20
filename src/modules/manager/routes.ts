import express from 'express';
import {
    createManagerValidationRules,
    getManagerByIdValidationRules,
    getManagersByOrgIdIdValidationRules, updateManagerValidationRules
} from "./validation";
import {
    createManagerController,
    getManagerByIdController,
    getManagersByOrgIdController,
    updateManagerController
} from "./controllers";

const router = express.Router();

/**
 * Get all managers by organisation ID
 */
router.get(
    '/:organisationId',
    getManagersByOrgIdIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getManagersByOrgIdController
);

/**
 * Get manager by ID
 */
router.get(
    '/id/:managerId',
    getManagerByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getManagerByIdController
);

/**
 * Create manager
 */
router.post(
    '/',
    createManagerValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createManagerController
);

/**
 * Update manager
 */
router.patch(
    '/',
    updateManagerValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateManagerController
);

export default router;
