import router from "../user/routes";
import {createNotificationController, createPushNotificationController, getNotificationsController} from "./controller";
import {createNotificationValidation, createPushNotificationValidation, getNotificationsValidation} from "./validation";

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
 * Get notifications
 */
router.get(
    '/',
    getNotificationsValidation,
    // isAuthenticated,
    // isValidationResult,
    getNotificationsController
);



export default router;
