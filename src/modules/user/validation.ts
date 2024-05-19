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
 * Get User by Email rules
 */
export const getUserByEmailValidationRules = checkSchema({
    email: {
        in: ['params'],
        isString: {
            errorMessage: 'The user email must be a string.'
        },
        notEmpty: {
            errorMessage: 'The user email field is required'
        }
    }
});

/**
 * Get User by Organisation ID rules
 */
export const getUsersByOrganisationIdValidationRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The organisation Id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The organisation Id field is required'
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
    },
    country: {
        in: ['body'],
        isString: {
            errorMessage: 'The country must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    }
});

/**
 * Update User validation rules
 */
export const updateUserValidationRules = checkSchema({
    id: {
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
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    lastName: {
        in: ['body'],
        isString: {
            errorMessage: 'The lastName must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    email: {
        in: ['body'],
        isString: {
            errorMessage: 'The email must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    role: {
        in: ['body'],
        isString: {
            errorMessage: 'The role must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
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
