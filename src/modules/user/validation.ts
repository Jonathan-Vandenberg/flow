import { checkSchema } from 'express-validator';

/**
 * Get User by ID rules
 */
export const getUserByIdValidationRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The user Id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The user Id field is required'
        }
    }
});

/**
 * Create User validation rules
 */
export const createUserValidationRules = checkSchema({
    agencyId: {
        in: ['body'],
        isString: {
            errorMessage: 'The agencyId must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    managerId: {
        in: ['body'],
        isString: {
            errorMessage: 'The manager Id must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    organisationId: {
        in: ['body'],
        isString: {
            errorMessage: 'The organisationId must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
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
    email: {
        in: ['body'],
        isString: {
            errorMessage: 'The email must be a string.'
        },
        notEmpty: {
            errorMessage: 'The email field is required'
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
    role: {
        in: ['body'],
        isString: {
            errorMessage: 'The role must be a string.'
        },
        notEmpty: {
            errorMessage: 'The role field is required'
        }
    },
    imageUrl: {
        in: ['body'],
        isString: {
            errorMessage: 'The imageUrl must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    expertiseArea: {
        in: ['body'],
        isString: {
            errorMessage: 'The expertiseArea must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    }
});
