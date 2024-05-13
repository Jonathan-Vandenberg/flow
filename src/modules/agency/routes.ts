import express from 'express';
// import { isAuthenticated, isValidationResult } from '../../middleware';
import {
    createAgencyValidationRules,
    getAgenciesOnOrganisationsValidationRules,
    getAgencyByIdValidationRules,
    updateAgencyValidationRules,
} from "./validation";
import {
    createAgencyController,
    getAgenciesOnOrganisationsController,
    getAgencyByIdController,
    updateAgencyController,
} from "./controllers";

const router = express.Router();

/**
 * Get agenciesOnOrganisations
 */
router.get(
    '/agencies-organisations',
    getAgenciesOnOrganisationsValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgenciesOnOrganisationsController
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
