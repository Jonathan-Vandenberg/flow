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
 * Get directories by student ID
 */
router.get(
    '/:studentId',
    getDirsByStudentIdRules,
    // isAuthenticated,
    // isValidationResult,
    getDirsByStudentIdController
);

/**
 * Get directory by ID
 */
router.get(
    '/id/:id',
    getDirRules,
    // isAuthenticated,
    // isValidationResult,
    getDirController
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

export default router;
