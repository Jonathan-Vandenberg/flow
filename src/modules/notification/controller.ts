import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import {createNotification, createPushNotification, getNotifications} from "./services";

/**
 * Send push notification
 */
export const createPushNotificationController = async (req: Request, res: Response) => {
    const notificationData = req.body

    try {
        const data = await createPushNotification(notificationData);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not create push notification - ' + e.message);
    }
};

/**
 * Send notification
 */
export const createNotificationController = async (req: Request, res: Response) => {
    const notificationData = req.body

    try {
        const data = await createNotification(notificationData);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not create notification - ' + e.message);
    }
};

/**
 * Get notifications
 */
export const getNotificationsController = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const data = await getNotifications(id);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not get notifications - ' + e.message);
    }
};
