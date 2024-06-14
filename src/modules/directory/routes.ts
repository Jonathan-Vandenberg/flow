import express from 'express';
import {
    createDirRules,
    getDirRules,
    getDirsByStudentIdRules,
    updateDirRules,
} from "./validation";
import {
    createDirController,
    getDirController,
    getDirsByStudentIdController,
    updateDirController,
} from "./controllers";
import {getStudentByIdController} from "../student/controllers";

const router = express.Router();

/**
 * Get directory by ID
 */
router.get(
    '/:id',
    getDirRules,
    // isAuthenticated,
    // isValidationResult,
    getDirController
);

/**
 * Get directories by student ID
 */
router.get(
    '/student/:studentId',
    getDirsByStudentIdRules,
    // isAuthenticated,
    // isValidationResult,
    getDirsByStudentIdController
);

/**
 * Create directory
 */
router.post(
    '/',
    createDirRules,
    // isAuthenticated,
    // isValidationResult,
    createDirController
);

/**
 * Update directory
 */
router.patch(
    '/',
    updateDirRules,
    // isAuthenticated,
    // isValidationResult,
    updateDirController
);

/**
 * Delete directory
 */
router.delete(
    '/',
    updateDirRules,
    // isAuthenticated,
    // isValidationResult,
    updateDirController
);

export default router;
