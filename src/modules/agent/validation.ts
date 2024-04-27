import { checkSchema } from 'express-validator';

/**
 * Get agents by manager ID
 */
export const getAgentsByAgencyIdValidationRules = checkSchema({
    agencyId: {
        in: ['params'],
        isString: {
            errorMessage: 'The agencyId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The agencyId field is required'
        }
    }
});

/**
 * Get an agent by their ID
 */
export const getAgentByIdValidationRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The agentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The agentId field is required'
        }
    }
});

/**
 * Create an Agent
 */
export const createAgentValidationRules = checkSchema({
    managerId: {
        in: ['body'],
        isString: {
            errorMessage: 'The managerId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The managerId field is required'
        }
    },
    expertiseArea: {
        in: ['body'],
        isString: {
            errorMessage: 'The expertiseArea must be a string.'
        },
        notEmpty: {
            errorMessage: 'The expertiseArea field is required'
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
            errorMessage: 'The imageUrl must be an object.'
        }
    },
    firstName: {
        in: ['body'],
        isString: {
            errorMessage: 'The agent firstName must be a string'
        }
    },
    lastName: {
        in: ['body'],
        isString: {
            errorMessage: 'The agent lastName must be a string'
        }
    },
    email: {
        in: ['body'],
        isString: {
            errorMessage: 'The agent email must be a string'
        }
    },
    mobile: {
        in: ['body'],
        isString: {
            errorMessage: 'The agent mobile must be a string'
        }
    },
});

export const updateAgentValidationRules = checkSchema({
    id: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The managerId must be a string.'
        }
    },
    expertiseArea: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The expertiseArea must be an array of strings.'
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
            errorMessage: 'The imageUrl must be a stirng.'
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


