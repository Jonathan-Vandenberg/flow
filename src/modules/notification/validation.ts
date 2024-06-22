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
    }
});
