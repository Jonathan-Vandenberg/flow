import router from "../user/routes";
import {createNotificationController, createPushNotificationController, getNotificationsController} from "./controller";
import {createNotificationValidation, createPushNotificationValidation, getNotificationsValidation} from "./validation";

/**
 * Get notifications
 */
router.get(
    '/get-notifications/:id',
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



export default router;
