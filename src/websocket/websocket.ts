import { Server, Socket } from 'socket.io';

interface CustomSocket extends Socket {
    userId?: string;
}

export const setupSocketIO = (io: Server) => {
    const userSockets = new Map<string, Set<CustomSocket>>();

    io.on('connection', (socket: CustomSocket) => {
        console.log('A user connected');

        socket.on('authenticate', (userId: string) => {
            console.log(`Authenticating socket for user: ${userId}`);
            socket.userId = userId;
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId)!.add(socket);
            socket.emit('authenticated');
            console.log(`Socket authenticated for user: ${userId}`);
        });

        socket.on('sendMessage', ({ recipientId, message }: { recipientId: string; message: string }) => {
            console.log(`Sending message to user: ${recipientId}`);
            const recipientSockets = userSockets.get(recipientId);
            if (recipientSockets) {
                recipientSockets.forEach((recipientSocket) => {
                    recipientSocket.emit(`newMessage:${recipientId}`, message);
                });
            }
        });

        socket.on('documentReviewed', ({ recipientId, message }: { recipientId: string; message: string }) => {
            console.log(`Sending message to user: ${recipientId}`);
            const recipientSockets = userSockets.get(recipientId);
            if (recipientSockets) {
                recipientSockets.forEach((recipientSocket) => {
                    recipientSocket.emit(`reviewedDocument:${recipientId}`, message);
                });
            }
        });

        socket.on('callAll', ({ recipientId, message }: { recipientId: string; message: string }) => {
            console.log(`Sending message to user: ${recipientId}`);
            const recipientSockets = userSockets.get(recipientId);
            if (recipientSockets) {
                recipientSockets.forEach((recipientSocket) => {
                    recipientSocket.emit(`allCall:${recipientId}`, message);
                });
            }
        });

        socket.on('studentAdded', ({ recipientId, message }: { recipientId: string; message: string }) => {
            console.log(`Sending message to user: ${recipientId}`);
            const recipientSockets = userSockets.get(recipientId);
            if (recipientSockets) {
                recipientSockets.forEach((recipientSocket) => {
                    recipientSocket.emit(`addedStudent:${recipientId}`, message);
                });
            }
        });

        socket.on('disconnect', () => {
            if (socket.userId) {
                const userSocketSet = userSockets.get(socket.userId);
                if (userSocketSet) {
                    userSocketSet.delete(socket);
                    if (userSocketSet.size === 0) {
                        userSockets.delete(socket.userId);
                    }
                }
            }
        });
    });
};
