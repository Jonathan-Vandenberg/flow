import { checkSchema } from 'express-validator';

/**
 * create push notification
 */
export const createPushNotificationValidation = checkSchema({
    title: {
        in: ['body'],
        isString: {
            errorMessage: 'The documentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The documentId field is required'
        }
    },
    body: {
        in: ['body'],
        isString: {
            errorMessage: 'The body must be a string.'
        },
        notEmpty: {
            errorMessage: 'The body field is required'
        }
    },
    tokens: {
        in: ['body'],
        isArray: {
            errorMessage: 'The tokens must be in an array.'
        },
        notEmpty: {
            errorMessage: 'The tokens field is required'
        }
    },
    groupId: {
        in: ['body'],
        isString: {
            errorMessage: 'The groupId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The groupId field is required'
        }
    },
    userId: {
        in: ['body'],
        isString: {
            errorMessage: 'The userId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The userId field is required'
        }
    },
    userEmail: {
        in: ['body'],
        isString: {
            errorMessage: 'The userEmail must be a string.'
        },
        notEmpty: {
            errorMessage: 'The userEmail field is required'
        }
    },
    type: {
        in: ['body'],
        isString: {
            errorMessage: 'The type must be a string.'
        },
        notEmpty: {
            errorMessage: 'The type field is required'
        }
    },
});
