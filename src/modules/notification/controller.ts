import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import notificationService from './services'

/**
 * Send push notification
 */
export const createPushNotificationController = async (req: Request, res: Response) => {
    const notificationData = req.body

    try {
        const data = await notificationService.createPushNotification(notificationData);
        return res.status(200).json(data);
    } catch (e: any) {
        logger.info(e);
        res.status(500).send('Unexpected error. Could not create push notification - ' + e.message);
    }
};
