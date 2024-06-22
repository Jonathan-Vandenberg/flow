import router from "../user/routes";
import {createPushNotificationController} from "./controller";
import {createPushNotificationValidation} from "./validation";

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

export default router;
