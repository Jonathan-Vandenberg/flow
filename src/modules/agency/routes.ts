import express from 'express';
// import { isAuthenticated, isValidationResult } from '../../middleware';
import {
    createAgencyValidationRules,
    getAgencyByIdValidationRules,
    getAgencyByManagerIdValidationRules,
    updateAgencyValidationRules,
} from "./validation";
import {
    createAgencyController,
    getAgencyByIdController,
    getAgencyByManagerIdController,
    updateAgencyController,
} from "./controllers";

const router = express.Router();

/**
 * Get agencies by manager ID
 */
router.get(
    '/:managerId',
    getAgencyByManagerIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgencyByManagerIdController
);

/**
 * Get agency by ID
 */
router.get(
    '/id/:id',
    getAgencyByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgencyByIdController
);

/**
 * Create agency
 */
router.post(
    '/',
    createAgencyValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createAgencyController
);


/**
 * Update agency
 */
router.patch(
    '/',
    updateAgencyValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateAgencyController
);

export default router;
