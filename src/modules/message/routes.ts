import express from 'express';
import {
    getMessagesByDocumentIdValidationRules,
    getMessagesByUserIdValidationRules,
    createMessageValidationRules, updateMessageByIdValidationRules
} from "./validation";
import {
    createMessageController,
    getMessagesByDocumentIdController,
    getMessagesByUserIdController, updateMessageByIdController,
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

/**
 * Update message by ID
 */
router.patch(
    '/',
    updateMessageByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateMessageByIdController
);

export default router;
