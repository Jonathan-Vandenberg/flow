import { checkSchema } from 'express-validator';

/**
 * Get agents by manager ID
 */
export const getAllStudentsByAgentIdValidationRules = checkSchema({
    agentId: {
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
 * Get agents by manager ID
 */
export const getStudentByIdValidationRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The student id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The student id field is required'
        }
    }
});

/**
 * Create student
 */
export const createStudentValidationRules = checkSchema({
    agentId: {
        in: ['body'],
        isString: {
            errorMessage: 'The agentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The agentId field is required'
        }
    },
    agencyId: {
        in: ['body'],
        isString: {
            errorMessage: 'The agencyId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The agencyId field is required'
        }
    },
    courseId: {
        in: ['body'],
        isString: {
            errorMessage: 'The courseId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The courseId field is required'
        }
    },
    organisationId: {
        in: ['body'],
        isString: {
            errorMessage: 'The organisationId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The organisationId field is required'
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
    age: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isNumeric: {
            errorMessage: 'The age must be a number.'
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
            errorMessage: 'The country must be a string.'
        }
    },
    guardianMobile: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The guardianMobile must be a string.'
        }
    },
    guardianEmail: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The guardianEmail must be a string.'
        }
    },
    expAttendDate: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The expAttendDate must be a string.'
        }
    },
    gapYear: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isBoolean: {
            errorMessage: 'The gapYear must be a boolean.'
        }
    },
    gapYearExplanation: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The gapYearExplanation must be a string.'
        }
    },
    previouslyRejected: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isBoolean: {
            errorMessage: 'The previouslyRejected must be a boolean.'
        }
    }
});

/**
 * Update student
 */
export const updateStudentValidationRules = checkSchema({
    id: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'The id field is required'
        },
        isString: {
            errorMessage: 'The id must be a string.'
        }
    },
    agentId: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The agentId must be a string.'
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
    age: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isNumeric: {
            errorMessage: 'The age must be a number.'
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
            errorMessage: 'The country must be a string.'
        }
    },
    guardianMobile: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The guardianMobile must be a string.'
        }
    },
    guardianEmail: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The guardianEmail must be a string.'
        }
    },
    course: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The course must be a string.'
        }
    },
    expAttendDate: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The expAttendDate must be a string.'
        }
    },
    gapYear: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isBoolean: {
            errorMessage: 'The gapYear must be a boolean.'
        }
    },
    gapYearExplanation: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The gapYearExplanation must be a string.'
        }
    },
    previouslyRejected: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The agentId must be a string.'
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
            errorMessage: 'The agentId must be a string.'
        }
    },
});
