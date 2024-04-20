import { checkSchema } from 'express-validator';

/**
 * Get agents by manager ID
 */
export const createOrganisationValidationRules = checkSchema({
    name: {
        in: ['body'],
        isString: {
            errorMessage: 'The name must be a string.'
        },
        notEmpty: {
            errorMessage: 'The name field is required'
        }
    },
    country: {
        in: ['body'],
        isString: {
            errorMessage: 'The country must be a string.'
        },
        notEmpty: {
            errorMessage: 'The country field is required'
        }
    },
    ceo: {
        in: ['body'],
        isString: {
            errorMessage: 'The ceo must be a string.'
        },
        notEmpty: {
            errorMessage: 'The ceo field is required'
        }
    },
    imageUrl: {
        in: ['body'],
        isString: {
            errorMessage: 'The imageUrl must be a string.'
        },
        notEmpty: {
            errorMessage: 'The imageUrl field is required'
        }
    }
});
