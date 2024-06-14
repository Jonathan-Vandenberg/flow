import { checkSchema } from 'express-validator';

/**
 * Get student documents by student ID
 */
export const getDirsByStudentIdRules = checkSchema({
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
 * Get student documents by ID
 */
export const getDirRules = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'The student documents id must be a string.'
        },
        notEmpty: {
            errorMessage: 'The student documents id field is required'
        }
    }
});

/**
 * Create student doc
 */
export const createDirRules = checkSchema({
    studentId: {
        in: ['body'],
        isString: {
            errorMessage: 'The studentId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The studentId field is required'
        }
    },
    requirementId: {
        in: ['body'],
        isString: {
            errorMessage: 'The requirementId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The requirementId field is required'
        }
    }
});

/**
 * Update studentDocs
 */
export const updateDirRules = checkSchema({
    id: {
        in: ['body'],
        isString: {
            errorMessage: 'The studentDocsId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The studentDocsId field is required'
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
            errorMessage: 'The status is required'
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
            errorMessage: 'The studentId is required'
        }
    }
});

/**
 * Delete studentDocs
 */
export const deleteDirRules = checkSchema({
    id: {
        in: ['body'],
        isString: {
            errorMessage: 'The studentDocsId must be a string.'
        },
        notEmpty: {
            errorMessage: 'The studentDocsId field is required'
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
            errorMessage: 'The status is required'
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
            errorMessage: 'The studentId is required'
        }
    }
});


