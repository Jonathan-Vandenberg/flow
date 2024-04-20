import { checkSchema } from 'express-validator';

/**
 * Get requirements by organisation ID
 */
export const getRequirementsByOrgIdRules = checkSchema({
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
 * Get requirements by student ID
 */
export const getRequirementsByStudentIdRules = checkSchema({
    studentId: {
        in: ['params'],
        isString: {
            errorMessage: 'The studentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The studentId field is required'
        }
    }
});

/**
 * Get requirements by course ID
 */
export const getRequirementsByCourseIdRules = checkSchema({
    courseId: {
        in: ['params'],
        isString: {
            errorMessage: 'The courseId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The courseId field is required'
        }
    }
});

/**
 * Get a requirement by ID
 */
export const getRequirementByIdRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The requirementId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The requirementId field is required'
        }
    }
});

/**
 * Create a Requirement
 */
export const createRequirementRules = checkSchema({
    organisationId: {
        in: ['body'],
        isString: {
            errorMessage: 'The organisationId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The organisationId field is required'
        }
    },
    studentId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The studentId must be a string.'
        },
    },
    courseId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The courseId must be a string.'
        }
    },
    details: {
        in: ['body'],
        isString: {
            errorMessage: 'The requirement details must be a string'
        },
        notEmpty: {
            errorMessage: 'The courseId field is required'
        }
    },
    status: {
        in: ['body'],
        isString: {
            errorMessage: 'The requirement status must be a string'
        },
        notEmpty: {
            errorMessage: 'The courseId field is required'
        }
    },
    type: {
        in: ['body'],
        isString: {
            errorMessage: 'The requirement type must be a string'
        },
        notEmpty: {
            errorMessage: 'The courseId field is required'
        }
    }
});

/**
 * Update a Requirement
 */
export const updateRequirementRules = checkSchema({
    id: {
        in: ['body'],

        isString: {
            errorMessage: 'The requirement ID must be a string.'
        },
        notEmpty: {
            errorMessage: 'The requirement Id field is required'
        }
    },
    organisationId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The organisationId must be a string.'
        }
    },
    studentId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The studentId must be a string.'
        },
    },
    courseId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The courseId must be a string.'
        }
    },
    details: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The requirement details must be a string'
        }
    },
    status: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The requirement status must be a string'
        }
    },
    type: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The requirement type must be a string'
        }
    }
});


