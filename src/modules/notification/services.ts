import * as admin from 'firebase-admin';
import { messaging } from "firebase-admin";
import BatchResponse = messaging.BatchResponse;
import prisma from "../../../prisma/prisma";
import {Notification, NotificationType} from "@prisma/client";

interface Recipient {
    id: string;
    email: string;
    tokens: string[];
}

interface PushNotificationData {
    title: string;
    body: string;
    groupId: string;
    userId: string;
    userEmail: string;
    type: string;
    recipients: Recipient[];
}

const createPushNotification = async (data: PushNotificationData) => {
    let isValid = false;
    let responses: BatchResponse[] = [];

    try {
                // recipients
        const messages = data.recipients.flatMap(recipient =>
            recipient.tokens.map(token => ({
                // title
                // body
                notification: {
                    title: data.title,
                    body: data.body,
                },
                // groupId
                // type
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

const createNotification = async (data: any) => {
    let isValid
    let notification : Notification | null = null

    try {
        notification = await prisma.notification.create({
            data
        })

        isValid = true;
    } catch (error: any) {
        console.log('Error sending notifications:', error.message);
        isValid = false;
    }

    return { isValid, data: notification };
};

interface NotificationResult {
    isValid: boolean;
    data: Notification[] | null;
    totalUnreadNotifications: number;
}
const getNotifications = async (id: string, page: number = 1, pageSize: number = 20): Promise<NotificationResult> => {
    let isValid: boolean;
    let notifications: Notification[] | null = null;
    let totalUnreadNotifications: number = 0;

    try {
        const [notificationsResult, unreadCount] = await prisma.$transaction([
            prisma.notification.findMany({
                where: { userId: id },
                orderBy: { createdAt: 'desc' },
                take: pageSize,
                skip: (page - 1) * pageSize
            }),
            prisma.notification.count({
                where: {
                    userId: id,
                    isRead: false
                }
            })
        ]);

        notifications = notificationsResult;
        totalUnreadNotifications = unreadCount;
        isValid = true;
    } catch (error: any) {
        console.log('Error fetching notifications:', error.message);
        isValid = false;
    }

    return { isValid, data: notifications, totalUnreadNotifications };
};

const updateNotifications = async (ids: string[]) => {
    let isValid: boolean;

    try {
        await prisma.notification.updateMany({
            where: {
                id: {
                    in: ids
                }},
            data: {
                isRead: true
            }
        })

        isValid = true;
    } catch (error: any) {
        console.log('Error updating notifications:', error.message);
        isValid = false;
    }

    return { isValid };
};

export { createPushNotification, createNotification, getNotifications, updateNotifications };
