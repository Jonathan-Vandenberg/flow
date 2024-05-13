import express from 'express';

import {
    createUserController, createUserOrganisationController,
    getUserByEmailController,
    getUserByIdController,
    getUsersByOrganisationIdController,
    updateUserController,
} from './controller';
import {
    createUserValidationRules, getUserByEmailValidationRules,
    getUserByIdValidationRules,
    getUsersByOrganisationIdValidationRules, updateUserValidationRules,
} from './validation';
import {createUserOrganisationValidationRules} from "../organisation/validation";

const router = express.Router();

/**
 * Create User
 */
router.post(
    '/',
    createUserValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createUserController
);

/**
 * Create User and Organisation
 */
router.post(
    '/user-org',
    createUserOrganisationValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createUserOrganisationController
);

/**
 * Get User by id User
 */
router.get(
    '/:id',
    getUserByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUserByIdController
);

/**
 * Get User by email
 */
router.get(
    '/email/:email',
    getUserByEmailValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUserByEmailController
);

/**
 * Get Users by Organisation id
 */
router.get(
    '/organisation/:id',
    getUsersByOrganisationIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUsersByOrganisationIdController
);

/**
 * Update User by id
 */
router.patch(
    '/',
    updateUserValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateUserController
);

export default router;
