import { checkSchema } from 'express-validator';

/**
 * Get contacts by agency ID
 */
export const getContactsByAgencyIdValidationRules = checkSchema({
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
 * Get a contact by ID
 */
export const getContactByIdValidationRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The contact Id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The contact Id field is required'
        }
    }
});

/**
 * Create a Contact
 */
export const createContactValidationRules = checkSchema({
    managerId: {
        in: ['body'],
        isString: {
            errorMessage: 'The managerId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The managerId field is required'
        }
    },
    agencyId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The agencyId must be an object.'
        }
    },
    role: {
        in: ['body'],
        isString: {
            errorMessage: 'The role firstName must be a string'
        }
    },
    name: {
        in: ['body'],
        isString: {
            errorMessage: 'The contact name must be a string'
        }
    },
    email: {
        in: ['body'],
        isString: {
            errorMessage: 'The contact email must be a string'
        }
    },
    mobile: {
        in: ['body'],
        isString: {
            errorMessage: 'The contact mobile must be a string'
        }
    },
});

/**
 * Update a Contact
 */
export const updateContactValidationRules = checkSchema({
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
        }
    },
    agencyId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The agencyId must be an array of strings.'
        }
    },
    role: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The role must be a string.'
        }
    },
    name: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The name must be a string.'
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


