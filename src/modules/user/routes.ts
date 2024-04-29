import express from 'express';

import {
    createUserController, getUserByIdController, getUsersByOrganisationIdController,
} from './controller';
import {
    createUserValidationRules,
    getUserByIdValidationRules,
    getUsersByOrganisationIdValidationRules,
} from './validation';

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
 * Get Users by Organisation id
 */
router.get(
    '/organisation/:id',
    getUsersByOrganisationIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUsersByOrganisationIdController
);

export default router;
