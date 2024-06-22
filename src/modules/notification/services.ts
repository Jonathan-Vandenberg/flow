import * as admin from 'firebase-admin';
import { messaging } from "firebase-admin";
import BatchResponse = messaging.BatchResponse;

interface Recipient {
    id: string;
    email: string;
    tokens: string[];
}

interface NotificationData {
    title: string;
    body: string;
    groupId: string;
    userId: string;
    userEmail: string;
    type: string;
    recipients: Recipient[];
}

const createPushNotification = async (data: NotificationData) => {
    let isValid = false;
    let responses: BatchResponse[] = [];

    try {
        const messages = data.recipients.flatMap(recipient =>
            recipient.tokens.map(token => ({
                notification: {
                    title: data.title,
                    body: data.body,
                },
                data: {
                    groupId: data.groupId || '',
                    userEmail: data.userEmail || '',
                    userId: data.userId || '',
                    type: data.type || '',
                    recipientId: recipient.id,
                    recipientEmail: recipient.email,
                },
                token: token,
            }))
        );

        const batchSize = 500;
        for (let i = 0; i < messages.length; i += batchSize) {
            const batch = messages.slice(i, i + batchSize);
            const response = await admin.messaging().sendAll(batch);
            responses.push(response);
        }

        console.log('Notification sending results:', responses);
        isValid = true;
    } catch (error: any) {
        console.log('Error sending push notifications:', error.message);
        isValid = false;
    }

    return { isValid, data: responses };
};

export default { createPushNotification };
