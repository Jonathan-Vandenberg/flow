import { checkSchema } from 'express-validator';

/**
 * Get message by document ID
 */
export const getMessagesByDocumentIdValidationRules = checkSchema({
    documentId: {
        in: ['params'],
        isString: {
            errorMessage: 'The documentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The documentId field is required'
        }
    }
});

/**
 * Get messages by User ID
 */
export const getMessagesByUserIdValidationRules = checkSchema({
    userId: {
        in: ['params'],
        isString: {
            errorMessage: 'The userId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The userId field is required'
        }
    }
});


/**
 * Create message
 */
export const createMessageValidationRules = checkSchema({
    messages: {
        in: ['body'],
        isArray: {
            errorMessage: 'The messages must be in an array.'
        },
        notEmpty: {
            errorMessage: 'The documentId field is required'
        }
    }
});
