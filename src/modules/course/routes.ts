import express from 'express';
import {
    createCourseValidationRules, deleteCourseValidationRules,
    getCourseByIdValidationRules,
    getCoursesByOrgIdValidationRules,
    updateCourseValidationRules
} from "./validation";
import {
    createCourseController, deleteCourseController,
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

/**
 * Delete course
 */
router.delete(
    '/',
    deleteCourseValidationRules,
    // isAuthenticated,
    // isValidationResult,
    deleteCourseController

);



export default router;
