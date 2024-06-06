import express from 'express';
import {
    getMessagesByDocumentIdValidationRules,
    getMessagesByUserIdValidationRules,
    createMessageValidationRules
} from "./validation";
import {
    createMessageController,
    getMessagesByDocumentIdController,
    getMessagesByUserIdController,
} from "./controllers";

const router = express.Router();

/**
 * Create message
 */
router.post(
    '/',
    createMessageValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createMessageController
);

/**
 * Get messages by document ID
 */
router.get(
    '/document/:documentId',
    getMessagesByDocumentIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getMessagesByDocumentIdController
);

/**
 * Get messages by user ID
 */
router.get(
    '/user/:userId',
    getMessagesByUserIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getMessagesByUserIdController
);

export default router;
