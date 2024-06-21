import express from 'express';

import {
    createUserController, createUserOrgController,
    getUserByEmailController,
    getUserByIdController, getUserByOrganisationIdController,
    updateUserController,
} from './controller';
import {
    createDeviceTokenValidationRules,
    createUserOrgValidationRules,
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
 * Create UserOrg
 */
router.post(
    '/user-org',
    createUserOrgValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createUserOrgController
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
    getUserByOrganisationIdController
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

/**
 * Create device token
 */
router.post(
    '/device-token',
    createDeviceTokenValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateUserController
);

export default router;
