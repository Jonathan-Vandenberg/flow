import express from 'express';
import {createOrganisationController, getOrganisationByIdController} from "./controllers";
import {createOrganisationValidationRules, getOrganisationByIdValidationRules} from "./validation";

const router = express.Router();
//
// /**
//  * Get all organisations
//  */
// router.get(
//     '/',
//     getAllOrganisationsValidationRules,
//     // isAuthenticated,
//     // isValidationResult
// );
//
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
 * Create organisation
 */
router.post(
    '/',
    createOrganisationValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createOrganisationController
);

// /**
//  * Update organisation
//  */
// router.get(
//     '/',
//     updateOrganisationValidationRules,
//     // isAuthenticated,
//     // isValidationResult
// );

export default router;
