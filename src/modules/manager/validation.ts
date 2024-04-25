import { checkSchema } from 'express-validator';

/**
 * Get managers by organisation ID
 */
export const getManagersByOrgIdIdValidationRules = checkSchema({
    organisationId: {
        in: ['params'],
        isString: {
            errorMessage: 'The organisationId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The organisationId field is required'
        }
    }
});

/**
 * Get an agent by their ID
 */
export const getManagerByIdValidationRules = checkSchema({
    managerId: {
        in: ['params'],
        isString: {
            errorMessage: 'The managerId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The managerId field is required'
        }
    }
});

/**
 * Create a Manager
 */
export const createManagerValidationRules = checkSchema({
    organisationId: {
        in: ['body'],
        isString: {
            errorMessage: 'The organisationId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The organisationId field is required'
        }
    },
    firstName: {
        in: ['body'],
        isString: {
            errorMessage: 'The manager firstName must be a string'
        }
    },
    lastName: {
        in: ['body'],
        isString: {
            errorMessage: 'The manager lastName must be a string'
        }
    },
    email: {
        in: ['body'],
        isString: {
            errorMessage: 'The manager email must be a string'
        }
    },
    mobile: {
        in: ['body'],
        isString: {
            errorMessage: 'The manager mobile must be a string'
        }
    },
    imageUrl: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The imageUrl must be a string.'
        }
    },
});

/**
 * Update a Manager
 */
export const updateManagerValidationRules = checkSchema({
    id: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'The managerId field is required'
        },
        isString: {
            errorMessage: 'The manager ID  must be a string.'
        }
    },
    imageUrl: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The imageUrl must be a string.'
        }
    },
    firstName: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The firstName must be a string.'
        }
    },
    lastName: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The lastName must be a string.'
        }
    },
    email: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The email must be a string.'
        }
    },
    mobile: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The mobile must be a string.'
        }
    }
});


