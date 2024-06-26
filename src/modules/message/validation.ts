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
                        !message.senderId ||
                        !message.groupId
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
        optional: true,
        isUUID: {
            errorMessage: 'The documentId field must be a valid UUID.',
        },
    },
    'messages.*.senderId': {
        notEmpty: {
            errorMessage: 'The senderId field is required for each message.',
        },
        isUUID: {
            errorMessage: 'The senderId field must be a valid UUID.',
        },
    },'messages.*.groupId': {
        notEmpty: {
            errorMessage: 'The groupId field is required for each message.',
        },
        isUUID: {
            errorMessage: 'The groupId field must be a valid UUID.',
        },
    },
});

/**
 * Create Group
 */
export const getGroupValidationRules = checkSchema({
    id: {
        in: ['body'],
        isString: {
            errorMessage: 'The id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The id must be present.'
        }
    },
    page: {
        in: ['body'],
        isNumeric: {
            errorMessage: 'The page must be a number.'
        },
        notEmpty: {
            errorMessage: 'The page must be present.'
        }
    },
    pageSize: {
        in: ['body'],
        isNumeric: {
            errorMessage: 'The pageSize must be a number.'
        },
        notEmpty: {
            errorMessage: 'The pageSize must be present.'
        }
    },
});

/**
 * Update Group
 */
export const updateGroupValidationRules = checkSchema({
    groupId: {
        in: ['body'],
        isString: { errorMessage: 'The groupId must be a string.' },
        notEmpty: { errorMessage: 'The groupId must be a string.' },
    },
    memberIds: {
        in: ['body'],
        isArray: { errorMessage: 'The memberIds must be in an array.' },
        notEmpty: { errorMessage: 'The memberIds must be in an array.' },
    },
    action: {
        in: ['body'],
        isString: { errorMessage: 'The action must be a string.' },
        notEmpty: { errorMessage: 'The action must be a string.' },
        isIn: {
            options: [['add', 'remove']],
            errorMessage: 'The action must be either "add" or "remove".',
        },
    },
});
