import router from "../user/routes";
import {createNotificationController, createPushNotificationController} from "./controller";
import {createNotificationValidation, createPushNotificationValidation} from "./validation";

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
