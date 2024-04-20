import express from 'express';
import {createDocRules, getDocRules, getDocsByDirectoryIdRules, updateDocRules} from "./validation";
import {
    createDocController,
    getDocController,
    getDocsByDirectoryIdController,
    updateDocController
} from "./controllers";
// import { isAuthenticated, isValidationResult } from '../../middleware';

const router = express.Router();

/**
 * Get all documents by directory ID
 */
router.get(
    '/:directoryId',
    getDocsByDirectoryIdRules,
    // isAuthenticated,
    // isValidationResult,
    getDocsByDirectoryIdController
);

/**
 * Get document by ID
 */
router.get(
    '/id/:id',
    getDocRules,
    // isAuthenticated,
    // isValidationResult,
    getDocController
);

/**
 * Create document
 */
router.post(
    '/',
    createDocRules,
    // isAuthenticated,
    // isValidationResult,
    createDocController
);

/**
 * Update document
 */
router.patch(
    '/',
    updateDocRules,
    // isAuthenticated,
    // isValidationResult,
    updateDocController
);

export default router;
