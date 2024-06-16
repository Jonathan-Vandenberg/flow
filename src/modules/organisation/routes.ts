import express from 'express';
import {
    createOrganisationController, getAgenciesOnOrganisationsController,
    getOrganisationByIdController,
    getUsersOnOrganisationsController
} from "./controllers";
import {
    createOrganisationValidationRules, getAgenciesOnOrganisationsValidationRules,
    getOrganisationByIdValidationRules,
    getUsersOnOrganisationsValidationRules
} from "./validation";

const router = express.Router();
/**
 * Get organisation by ID
 */
router.get(
    '/:id',
    getOrganisationByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getOrganisationByIdController
);

/**
 * Get usersOnOrganisations by ID
 */
router.get(
    '/users-on-organisations/:id',
    getUsersOnOrganisationsValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUsersOnOrganisationsController
);

/**
 * Get usersOnAgencies by ID
 */
router.get(
    '/agencies-on-organisations/:id/:userId',
    getAgenciesOnOrganisationsValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getAgenciesOnOrganisationsController
);

/**
 * Create organisation
 */
router.post(
    '/',
    createOrganisationValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createOrganisationController
);

export default router;
