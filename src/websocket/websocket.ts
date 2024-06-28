import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface CustomSocket extends Socket {
    userId?: string;
}

export const setupSocketIO = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
    const userSockets = new Map<string, Set<CustomSocket>>();

    console.log('INFO:: USER SOCKETS: ', userSockets)

    io.on('connection', (socket: CustomSocket) => {
        console.log('INFO:: A user connected');

        socket.on('authenticate', (userId: string) => {
            socket.userId = userId;
            if (!userSockets.has(userId)) {
                console.log(`INFO:: userSockets does not contain this userId: ${userId}`)
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId)!.add(socket);
            console.log(`INFO:: Socket Set contains this userId: ${userId}`)
        });

        socket.on('sendMessage', ({ userId, message }: { userId: string; message: string }) => {
            console.log(`INFO:: sendMessage socket message sent`)
            const recipientSockets = userSockets.get(userId);
            console.log(`INFO:: Socket Set contains this userId: ${userId}`)
            if (recipientSockets) {
                recipientSockets.forEach((recipientSocket) => {
                    console.log(`INFO:: Socket Set contains this userId: ${userId}`)
                    recipientSocket.emit('newMessage', message);
                });
            }
        });

        socket.on('disconnect', () => {
            console.log(`INFO:: Disconnecting socket`)
            if (socket.userId && userSockets.has(socket.userId)) {
                console.log(`INFO:: Trying to delete socket of userId: ${socket.userId}`)
                userSockets.get(socket.userId)!.delete(socket);
                if (userSockets.get(socket.userId)!.size === 0) {
                    console.log(`INFO:: Deleting Socket for userId: ${socket.userId}`)
                    userSockets.delete(socket.userId);
                }
            }
        });
    });
};
