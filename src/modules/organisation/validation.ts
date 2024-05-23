import { checkSchema } from 'express-validator';

/**
 * Get agents by manager ID
 */
export const createOrganisationValidationRules = checkSchema({
    userId: {
        in: ['body'],
        isString: {
            errorMessage: 'The userId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The userId field is required'
        }
    },
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

/**
 * Get organisation by ID
 */
export const getOrganisationByIdValidationRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The organisation id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The organisation id field is required'
        }
    }
});

/**
 * Create User and Organisation
 */
export const createUserOrganisationValidationRules = checkSchema({
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
    firstName: {
        in: ['body'],
                isString: {
                errorMessage: 'The firstName must be a string.'
            },
            notEmpty: {
                errorMessage: 'The firstName field is required'
            }
    },
    lastName: {
        in: ['body'],
                isString: {
                errorMessage: 'The lastName must be a string.'
            },
            notEmpty: {
                errorMessage: 'The lastName field is required'
            }
    },
    mobile: {
        in: ['body'],
        isString: {
            errorMessage: 'The mobile must be a string.'
        },
        notEmpty: {
            errorMessage: 'The mobile field is required'
        }
    },
    email: {
        in: ['body'],
            isString: {
            errorMessage: 'The email must be a string.'
        },
        notEmpty: {
            errorMessage: 'The email field is required'
        }
    },
});
