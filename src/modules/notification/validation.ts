import { checkSchema } from 'express-validator';

/**
 * Create push notification validation schema
 */
export const createPushNotificationValidation = checkSchema({
    title: {
        in: ['body'],
        isString: {
            errorMessage: 'The title must be a string.',
        },
        notEmpty: {
            errorMessage: 'The title field is required',
        },
    },
    body: {
        in: ['body'],
        isString: {
            errorMessage: 'The body must be a string.',
        },
        notEmpty: {
            errorMessage: 'The body field is required',
        },
    },
    recipients: {
        in: ['body'],
        isArray: {
            errorMessage: 'The recipients must be an array.',
        },
        notEmpty: {
            errorMessage: 'The recipients field is required',
        },
    },
    'recipients.*.id': {
        in: ['body'],
        isString: {
            errorMessage: 'Each recipient id must be a string.',
        },
        notEmpty: {
            errorMessage: 'Each recipient must have an id',
        },
    },
    'recipients.*.email': {
        in: ['body'],
        isEmail: {
            errorMessage: 'Each recipient email must be a valid email address.',
        },
        notEmpty: {
            errorMessage: 'Each recipient must have an email',
        },
    },
    'recipients.*.tokens': {
        in: ['body'],
        isArray: {
            errorMessage: 'Each recipient tokens must be an array.',
        },
        notEmpty: {
            errorMessage: 'Each recipient must have at least one token',
        },
    },
    'recipients.*.tokens.*': {
        in: ['body'],
        isString: {
            errorMessage: 'Each token must be a string.',
        },
        notEmpty: {
            errorMessage: 'Tokens cannot be empty strings',
        },
    },
    groupId: {
        in: ['body'],
        isString: {
            errorMessage: 'The groupId must be a string.',
        },
        notEmpty: {
            errorMessage: 'The groupId field is required',
        },
    },
    userId: {
        in: ['body'],
        isString: {
            errorMessage: 'The userId must be a string.',
        },
        notEmpty: {
            errorMessage: 'The userId field is required',
        },
    },
    userEmail: {
        in: ['body'],
        isString: {
            errorMessage: 'The userEmail must be a string.',
        },
        notEmpty: {
            errorMessage: 'The userEmail field is required',
        },
    },
    type: {
        in: ['body'],
        isString: {
            errorMessage: 'The type must be a string.',
        },
        notEmpty: {
            errorMessage: 'The type field is required',
        },
    },
});

/**
 * Create notification validation schema
 */
export const createNotificationValidation = checkSchema({
    userId: {
        in: ['body'],
        isString: {
            errorMessage: 'The userId must be a string.',
        },
        notEmpty: {
            errorMessage: 'The userId field is required',
        },
    },
    type: {
        in: ['body'],
        isString: {
            errorMessage: 'The type must be a string.',
        },
        notEmpty: {
            errorMessage: 'The type field is required',
        },
    },
    data: {
        in: ['body'],
        isJSON: {
            errorMessage: 'The data must be in JSON format.',
        },
        notEmpty: {
            errorMessage: 'The data field is required',
        },
    },
});
