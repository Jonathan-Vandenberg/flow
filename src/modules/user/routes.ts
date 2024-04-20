import express from 'express';

import { isAuthenticated, isValidationResult } from '../../middleware';
import {
    checkAliasController, createUserController,
    getUserByIdController
} from './controller';
import {
    checkAliasValidationRules, createUserValidationRules, getUserByIdValidationRules,
} from './validation';

const router = express.Router();

/**
 * Get all users
 */
// router.get('/', getAllUsersController);

/**
 * Get user by address or alias
 */
// router.get(
//     '/:addressAlias',
//     getUserAddressAliasValidationRules,
//     isValidationResult,
//     getUsersByAddressOrAliasController
// );

/**
 * Update user
 */
// router.put(
//     '/',
//     updateUserValidationRules,
//     isValidationResult,
//     isAuthenticated,
//     updateUserController
// );

/**
 * Check alias already exists
 */
router.get(
    '/check-alias/:alias',
    checkAliasValidationRules,
    isAuthenticated,
    isValidationResult,
    checkAliasController
);

/**
 * Get user by Id
 */
router.get(
    '/userById/:userId',
    getUserByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getUserByIdController
);

/**
 * Create User
 */
router.post(
    '/create-user',
    createUserValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createUserController
);

export default router;
