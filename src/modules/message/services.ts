import prisma from "../../../prisma/prisma";
import { logger } from "../../utils/logger";
import { Group, Message } from "@prisma/client";

const getMessagesByDocumentId = async (documentId: string) => {
    let messages: Message[] | null = null;
    try {
        messages = await prisma.message.findMany({
            where: { documentId },
            include: { sender: true, group: true, document: true },
        });
    } catch (e: any) {
        logger.error('ERROR::getMessagesByDocumentId: Could not get messages by document ID: ' + e.message);
    }
    return { isValid: !!messages, data: messages };
};

const getGroup = async (id: string) => {
    let group: Group | null = null;
    try {
        group = await prisma.group.findUnique({
            where: { id },
            include: {
                messages: {
                    select: {
                        id: true,
                        createdAt: true,
                       content: true,
                       sender: {
                           select: {
                               id: true,
                               firstName: true,
                               lastName: true,
                               imageUrl: true,
                               deviceToken: {
                                   select: {
                                       userId: true,
                                       token: true
                                   }
                               }
                           }
                       }
                    }
                },
                groupMembers: {
                    include: {
                        user: {
                            select: {
                                usersOnOrganisations: {
                                    select: {
                                        userId: true,
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
                student: true, },
        });
    } catch (e: any) {
        logger.error('ERROR::getGroup: Could not get group: ' + e.message);
    }
    return { isValid: !!group, data: group };
};

const getMessagesByUserId = async (userId: string) => {
    let messages: Message[] | null = null;
    try {
        messages = await prisma.message.findMany({
            where: { senderId: userId },
            include: { sender: true, group: true, document: true },
        });
    } catch (e: any) {
        logger.error('ERROR::getMessagesByUserId: Failed to get messages by User ID: ' + e.message);
    }
    return { isValid: !!messages, data: messages };
};

const createMessage = async (data: any) => {
    let messages: Message[] = [];
    try {
        for (const message of data) {
            const createdMessage = await prisma.message.create({
                data: {
                    content: message.content,
                    sender: { connect: { id: message.senderId } },
                    group: { connect: { id: message.groupId } },
                    ...(message.documentId && { document: { connect: { id: message.documentId } } }),
                },
            });

            messages.push(createdMessage);
        }
    } catch (e: any) {
        console.error(`ERROR::createMessage: Failed to create messages: ` + e.message);
        throw e;
    }
    return { data: messages, isValid: messages.length > 0 };
};

const updateGroup = async (data: { groupId: string, memberIds: string[], action: 'add' | 'remove' }) => {
    let group: Group | null = null;
    try {
        group = await prisma.group.update({
            where: { id: data.groupId },
            data: {
                ...(data.action === 'add' && {
                    groupMembers: {
                        connectOrCreate: data.memberIds.map((userId) => ({
                            where: {
                                userId_groupId: {
                                    userId,
                                    groupId: data.groupId,
                                },
                            },
                            create: {
                                userId,
                            },
                        })),
                    },
                }),
                ...(data.action === 'remove' && {
                    groupMembers: {
                        deleteMany: {
                            userId: { in: data.memberIds },
                            groupId: data.groupId,
                        },
                    },
                }),
            },
            include: {
                groupMembers: {
                    include: {
                        user: true,
                    },
                },
                student: true,
            },
        });
    } catch (e: any) {
        console.error(`ERROR::updateGroupMembers: Failed to ${data.action} members ${data.action === 'add' ? 'to' : 'from'} group: ` + e.message);
        throw e;
    }
    return { data: group, isValid: !!group };
};
export default {
    getMessagesByDocumentId,
    getMessagesByUserId,
    createMessage,
    getGroup,
    updateGroup
};
