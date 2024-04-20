import express from 'express';
import {
    createCourseValidationRules,
    getCourseByIdValidationRules,
    getCoursesByOrgIdValidationRules,
    updateCourseValidationRules
} from "./validation";
import {
    createCourseController,
    getCourseByIdController,
    getCoursesByOrgIdController,
    updateCourseController
} from "./controllers";

const router = express.Router();

/**
 * Get all courses by organisation ID
 */
router.get(
    '/:organisationId',
    getCoursesByOrgIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getCoursesByOrgIdController
);

/**
 * Get course by ID
 */
router.get(
    '/id/:courseId',
    getCourseByIdValidationRules,
    // isAuthenticated,
    // isValidationResult,
    getCourseByIdController
);

/**
 * Create course
 */
router.post(
    '/',
    createCourseValidationRules,
    // isAuthenticated,
    // isValidationResult,
    createCourseController
);

/**
 * Update course
 */
router.patch(
    '/',
    updateCourseValidationRules,
    // isAuthenticated,
    // isValidationResult,
    updateCourseController
);

export default router;
