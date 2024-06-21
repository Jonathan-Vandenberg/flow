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
 * Create UserOrg validation rules
 */
export const createUserOrgValidationRules = checkSchema({
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
    userCountry: {
        in: ['body'],
        isString: {
            errorMessage: 'The userCountry must be a string.'
        },
        notEmpty: {
            errorMessage: 'The userCountry field is required'
        }
    },
    orgName:  {
        in: ['body'],
        isString: {
            errorMessage: 'The orgName must be a string.'
        },
        notEmpty: {
            errorMessage: 'The orgName field is required'
        }
    },
    orgCountry:  {
        in: ['body'],
        isString: {
            errorMessage: 'The orgCountry must be a string.'
        },
        notEmpty: {
            errorMessage: 'The orgCountry field is required'
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

/**
 * Create device token rules
 */
export const createDeviceTokenValidationRules = checkSchema({
    userId: {
        in: ['body'],
        isString: {
            errorMessage: 'The userId must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
    token: {
        in: ['body'],
        isString: {
            errorMessage: 'The token must be a string.'
        },
        optional: {
            options: {
                checkFalsy: true
            }
        }
    },
});

