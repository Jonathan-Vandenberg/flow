import router from "../user/routes";
import {
    createNotificationController,
    createPushNotificationController,
    getNotificationsController,
    updateNotificationsController
} from "./controller";
import {
    createNotificationValidation,
    createPushNotificationValidation,
    getNotificationsValidation,
    updateNotificationsValidation
} from "./validation";

/**
 * Get notifications
 */
router.get(
    '/get-notifications/:id/:page/:pageSize',
    getNotificationsValidation,
    // isAuthenticated,
    // isValidationResult,
    getNotificationsController
);

/**
 * Create push notification
 */
router.post(
    '/push-notification',
    createPushNotificationValidation,
    // isAuthenticated,
    // isValidationResult,
    createPushNotificationController
);

/**
 * Create notification
 */
router.post(
    '/',
    createNotificationValidation,
    // isAuthenticated,
    // isValidationResult,
    createNotificationController
);

/**
 * Update notification
 */
router.patch(
    '/',
    updateNotificationsValidation,
    // isAuthenticated,
    // isValidationResult,
    updateNotificationsController
);

export default router;
