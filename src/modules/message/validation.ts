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
 * Get messages by User ID
 */
export const updateMessageByIdValidationRules = checkSchema({
    ids: {
        in: ['body'],
        isArray: {
            errorMessage: 'The ids must be in an array.'
        },
        notEmpty: {
            errorMessage: 'The ids must be in an array'
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
            errorMessage: 'The messages must be an array.',
        },
        notEmpty: {
            errorMessage: 'The messages array must not be empty.',
        },
        custom: {
            options: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }

                for (const message of value) {
                    if (
                        !message.content ||
                        !message.documentId ||
                        !message.receiverId ||
                        !message.senderId
                    ) {
                        return false;
                    }
                }

                return true;
            },
            errorMessage: 'Each message must have content, documentId, receiverId, and senderId fields.',
        },
    },
    'messages.*.content': {
        notEmpty: {
            errorMessage: 'The content field is required for each message.',
        },
        isString: {
            errorMessage: 'The content field must be a string.',
        },
    },
    'messages.*.documentId': {
        notEmpty: {
            errorMessage: 'The documentId field is required for each message.',
        },
        isUUID: {
            errorMessage: 'The documentId field must be a valid UUID.',
        },
    },
    'messages.*.receiverId': {
        notEmpty: {
            errorMessage: 'The receiverId field is required for each message.',
        },
        isUUID: {
            errorMessage: 'The receiverId field must be a valid UUID.',
        },
    },
    'messages.*.senderId': {
        notEmpty: {
            errorMessage: 'The senderId field is required for each message.',
        },
        isUUID: {
            errorMessage: 'The senderId field must be a valid UUID.',
        },
    },
});
