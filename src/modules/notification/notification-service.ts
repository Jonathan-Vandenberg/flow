import { Server } from 'socket.io';
import { PrismaClient, NotificationType, DeviceToken } from '@prisma/client';
import admin from 'firebase-admin';
import { EmailAction } from "../../email/config";
import { sendTransactionalEmail } from "../../email/utils/email-utils";

class NotificationService {
    private static instance: NotificationService | null = null;
    private io: Server;
    private prisma: PrismaClient;

    private constructor(io: Server, prisma: PrismaClient) {
        this.io = io;
        this.prisma = prisma;
    }

    public static getInstance(io?: Server, prisma?: PrismaClient): NotificationService {
        if (!NotificationService.instance) {
            if (!io || !prisma) {
                throw new Error('IO and Prisma must be provided when creating the NotificationService instance');
            }
            NotificationService.instance = new NotificationService(io, prisma);
        }
        return NotificationService.instance;
    }

    async sendNotification({userIds, eventType, emailData, pushNotificationData, dbNotificationData}: {
        userIds: string[];
        eventType: string;
        emailData?: {
            action: EmailAction;
            recipientEmail: string;
            dynamicData: Record<string, string>;
        };
        pushNotificationData: {
            title: string;
            body: string;
            data?: Record<string, string>;
        };
        dbNotificationData: {
            type: NotificationType;
            data: Record<string, any>;
        };
    }) {
        this.sendWebSocketEvents(userIds, eventType, dbNotificationData.data);
        await this.createDatabaseNotifications(userIds, dbNotificationData);
        await this.sendPushNotifications(userIds, pushNotificationData);
        if (emailData) {
            await this.sendEmail(emailData);
        }

        console.log('NOTIFICATION SERVICE DATA userIds: ', userIds)
        console.log('NOTIFICATION SERVICE DATA eventType: ', eventType)
        console.log('NOTIFICATION SERVICE DATA emailData:', emailData)
        console.log('NOTIFICATION SERVICE DATA pushNotificationData:', pushNotificationData)
        console.log('NOTIFICATION SERVICE DATA dbNotificationData:', dbNotificationData)
    }

    private sendWebSocketEvents(userIds: string[], eventType: string, data: any) {
        userIds.forEach(userId => {
            this.io.emit(`${eventType}:${userId}`)
        });
    }

    private async createDatabaseNotifications(userIds: string[], notificationData: { type: NotificationType; data: Record<string, any> }) {
        await this.prisma.notification.createMany({
            data: userIds.map(userId => ({
                userId,
                type: notificationData.type,
                data: notificationData.data,
            })),
        });
    }

    private async sendPushNotifications(userIds: string[], notificationData: { title: string; body: string; data?: Record<string, string> }) {
        const deviceTokens = await this.prisma.deviceToken.findMany({
            where: { userId: { in: userIds } },
        });

        const validTokens = deviceTokens
            .filter((token) => token.token)
            .map((token) => token.token);

        if (validTokens.length > 0) {
            await admin.messaging().sendMulticast({
                tokens: validTokens,
                notification: {
                    title: notificationData.title,
                    body: notificationData.body,
                },
                data: notificationData.data,
            });
        }
    }

    private async sendEmail(emailData: { action: EmailAction; recipientEmail: string; dynamicData: Record<string, string> }) {
        await sendTransactionalEmail(emailData);
    }
}

export default NotificationService;
