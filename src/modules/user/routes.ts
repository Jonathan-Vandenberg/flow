import express from 'express';

import {
    createUserController, getUserByIdController,
} from './controller';
import {
    createUserValidationRules, getUserByIdValidationRules,
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
 * Create User
 */
router.get(
    '/:id',
    getUserByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUserByIdController
);

export default router;
