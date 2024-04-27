import express from 'express';
// import { isAuthenticated, isValidationResult } from '../../middleware';
import {
    createContactValidationRules,
    getContactByIdValidationRules, getContactsByAgencyIdValidationRules,
    updateContactValidationRules
} from "./validation";
import {
    createContactController,
    getContactByIdController, getContactsByAgencyIdController,
    updateContactController
} from "./controllers";

const router = express.Router();

/**
 * Get contact by agency ID
 */
router.get(
    '/:agencyId',
    getContactsByAgencyIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getContactsByAgencyIdController
);

/**
 * Get contact by ID
 */
router.get(
    '/id/:id',
    getContactByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getContactByIdController
);

/**
 * Create contact
 */
router.post(
    '/',
    createContactValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createContactController
);


/**
 * Update contact
 */
router.patch(
    '/',
    updateContactValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateContactController
);

export default router;
