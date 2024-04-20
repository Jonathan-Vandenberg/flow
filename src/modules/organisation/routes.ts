import express from 'express';
import {createOrganisationController} from "./controllers";
import {createOrganisationValidationRules} from "./validation";

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
// /**
//  * Get organisation by ID
//  */
// router.get(
//     '/',
//     getOrganisationByIdValidationRules,
//     // isAuthenticated,
//     // isValidationResult
// );

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
