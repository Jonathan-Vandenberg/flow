import express from 'express';

import {
    createRequirementController,
    getRequirementByIdController, getRequirementsByCourseIdController,
    getRequirementsByOrgIdController, getRequirementsByStudentIdController,
    updateRequirementController
} from "./controllers";
import {
    createRequirementRules,
    getRequirementByIdRules, getRequirementsByCourseIdRules,
    getRequirementsByOrgIdRules, getRequirementsByStudentIdRules,
    updateRequirementRules
} from "./validation";

const router = express.Router();

/**
 * Get all requirements by organisation ID
 */
router.get(
    '/organisation/:organisationId',
    getRequirementsByOrgIdRules,
    // isAuthenticated,
    // isValidationResult,
    getRequirementsByOrgIdController
);

/**
 * Get all requirements by course ID
 */
router.get(
    '/course/:courseId',
    getRequirementsByCourseIdRules,
    // isAuthenticated,
    // isValidationResult,
    getRequirementsByCourseIdController
);

/**
 * Get all requirements by student ID
 */
router.get(
    '/student/:studentId',
    getRequirementsByStudentIdRules,
    // isAuthenticated,
    // isValidationResult,
    getRequirementsByStudentIdController
);

/**
 * Get requirement by ID
 */
router.get(
    '/id/:id',
    getRequirementByIdRules,
    // isAuthenticated,
    // isValidationResult,
    getRequirementByIdController
);

/**
 * Create requirement
 */
router.post(
    '/',
    createRequirementRules,
    // isAuthenticated,
    // isValidationResult,
    createRequirementController
);

/**
 * Update requirement
 */
router.patch(
    '/',
    updateRequirementRules,
    // isAuthenticated,
    // isValidationResult,
    updateRequirementController
);

export default router;
