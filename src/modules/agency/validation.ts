import { checkSchema } from 'express-validator';

/**
 * Get agency by manager ID
 */
export const getAgencyByManagerIdValidationRules = checkSchema({
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
 * Get an agency by its ID
 */
export const getAgencyByIdValidationRules = checkSchema({
    id: {
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
 * Create an Agency
 */
export const createAgencyValidationRules = checkSchema({
    managerId: {
        in: ['body'],
        isString: {
            errorMessage: 'The managerId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The managerId field is required'
        }
    },
    sector: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The sector must be a string'
        }
    },
    country: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The country must be a stirng.'
        }
    },
    district: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The district must be a string.'
        }
    },
    market: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The market must be a string.'
        }
    },
    commissionPercentage: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isNumeric: {
            errorMessage: 'The commissionPercentage must be a number.'
        }
    }
});

export const updateAgencyValidationRules = checkSchema({
    id: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The id must be a string.'
        }
    },
    managerId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The managerId must be a string.'
        },
    },
    sector: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The sector must be a string'
        }
    },
    country: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The country must be a stirng.'
        }
    },
    district: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The district must be a string.'
        }
    },
    market: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The market must be a string.'
        }
    },
    commissionPercentage: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isNumeric: {
            errorMessage: 'The commissionPercentage must be a number.'
        }
    }
});


