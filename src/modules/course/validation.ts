import { checkSchema } from 'express-validator';

/**
 * Get courses by organisation ID
 */
export const getCoursesByOrgIdValidationRules = checkSchema({
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
 * Get a course by ID
 */
export const getCourseByIdValidationRules = checkSchema({
    id: {
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
 * Create a course
 */
export const createCourseValidationRules = checkSchema({
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
        isString: {
            errorMessage: 'The course name must be a string'
        }
    },
    description: {
        in: ['body'],
        isString: {
            errorMessage: 'The course description must be a string'
        }
    }
});

/**
 * Update a course
 */
export const updateCourseValidationRules = checkSchema({
    id: {
        in: ['body'],
        isString: {
            errorMessage: 'The course ID  must be a string.'
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
    }
});


