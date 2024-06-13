import { checkSchema } from 'express-validator';

/**
 * Get all documents by directory ID
 */
export const getDocsByDirectoryIdRules = checkSchema({
    directoryId: {
        in: ['params'],
        isString: {
            errorMessage: 'The directoryId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The directoryId field is required'
        }
    }
});

/**
 * Get document by ID
 */
export const getDocRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The document id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The document id field is required'
        }
    }
});

/**
 * Create document
 */
export const createDocRules = checkSchema({
    directoryId: {
        in: ['body'],
        isString: {
            errorMessage: 'The directory ID must be a string.'
        },
        notEmpty: {
            errorMessage: 'The directory ID field is required'
        }
    },
    studentId: {
        in: ['body'],
        isString: {
            errorMessage: 'The studentId ID must be a string.'
        },
        notEmpty: {
            errorMessage: 'The studentId ID field is required'
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
    description: {
        in: ['body'],
        isString: {
            errorMessage: 'The description must be a string.'
        },
        notEmpty: {
            errorMessage: 'The description field is required'
        }
    },
    url: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The url must be a string.'
        }
    },
});

/**
 * Update document
 */
export const updateDocRules = checkSchema({
    id: {
        in: ['body'],
        isString: {
            errorMessage: 'The id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The id field is required'
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
    description: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The description must be a string.'
        }
    },
    url: {
        in: ['body'],
        optional: {
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: 'The url must be a string.'
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
            errorMessage: 'The status must be a string.'
        }
    },
});


