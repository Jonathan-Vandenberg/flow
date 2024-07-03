import { NotificationService } from '../../services/NotificationService';

declare global {
    namespace Express {
        export interface Request {
            notificationService: NotificationService;
        }
    }
}
