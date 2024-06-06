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
    documentId: {
        in: ['body'],
        isString: {
            errorMessage: 'The documentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The documentId field is required'
        }
    },
    senderId: {
        in: ['body'],
        isString: {
            errorMessage: 'The senderId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The senderId field is required'
        }
    },
    receiverId: {
        in: ['body'],
        isString: {
            errorMessage: 'The receiverId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The receiverId field is required'
        }
    },
    content: {
        in: ['body'],
        isString: {
            errorMessage: 'The content must be a string.'
        },
        notEmpty: {
            errorMessage: 'The content field is required'
        }
    },
});
