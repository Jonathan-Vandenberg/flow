import * as admin from 'firebase-admin';
import {BatchResponse} from "firebase-admin/lib/messaging";
const createPushNotification = async (data: any) => {
    let isValid
    let response: BatchResponse | null = null
    try {
        const message = {
            notification: { title: data.title, body: data.body },
            tokens: data.tokens,
        };

        response = await admin.messaging().sendMulticast(message);
        console.log(response)
        isValid = true
    } catch (error: any) {
        console.log('Error sending push notification:', error.message);
        isValid = false
    }
    return { isValid, data: response };
};

export default {
    createPushNotification
}
