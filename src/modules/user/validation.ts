import { checkSchema } from 'express-validator';

/**
 * Validation params, check if alias exists
 */
export const checkAliasValidationRules = checkSchema({
    alias: {
        in: ['params'],
        isString: {
            errorMessage: 'The alias must be a string.'
        },
        notEmpty: {
            errorMessage: 'The alias field is required'
        }
    }
});

/**
 * Validation params, get user by ID
 */
export const getUserByIdValidationRules = checkSchema({
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
 * Validation params, check if alias exists
 */
export const createUserValidationRules = checkSchema({
    name: {
        in: ['body'],
        isString: {
            errorMessage: 'The name must be a string.'
        },
        notEmpty: {
            errorMessage: 'The name field is required'
        }
    },
    role: {
        in: ['body'],
        isString: {
            errorMessage: 'The role must be a string.'
        },
        notEmpty: {
            errorMessage: 'The role field is required'
        }
    }
});
