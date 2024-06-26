import prisma from "../../../prisma/prisma";
import { logger } from "../../utils/logger";
import { Group, Message } from "@prisma/client";
import {createNotification} from '../notification/services'

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

const getGroup = async (id: string, page: number = 1, pageSize: number = 25) => {
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
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: pageSize,
                    skip: (page - 1) * pageSize
                },
                groupMembers: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                deviceToken: {
                                    select: { userId: true, token: true }
                                },
                                usersOnOrganisations: {
                                    select: { userId: true, role: true },
                                },
                            },
                        },
                    },
                },
                student: true,
            },
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

interface CreateMessageData {
    content: string;
    senderId: string;
    groupId: string;
    documentId?: string;
}

const createMessage = async (data: CreateMessageData[]): Promise<{ data: Message[], isValid: boolean }> => {
    let messages: Message[] = [];

    try {
        await prisma.$transaction(async (t) => {
            for (const message of data) {
                const sender = await t.user.findUnique({
                    where: { id: message.senderId },
                    select: { firstName: true, lastName: true }
                });

                if (!sender) {
                    console.error(`ERROR::createMessage: No sender found!`);
                    continue;
                }

                const createdMessage = await t.message.create({
                    data: {
                        content: message.content,
                        sender: { connect: { id: message.senderId } },
                        group: { connect: { id: message.groupId } },
                        ...(message.documentId && { document: { connect: { id: message.documentId } } }),
                    },
                });

                messages.push(createdMessage);

                const groupMembers = await t.groupMember.findMany({
                    where: {
                        groupId: message.groupId,
                        userId: { not: message.senderId },
                    },
                    select: {
                        userId: true,
                    },
                });

                const group = await t.group.findUnique({
                    where: {
                        id: message.groupId
                    },
                    select: {
                        student: {
                            select: {
                                name: true
                            }
                        }
                    }
                })

                for (const member of groupMembers) {
                    await createNotification({
                        type: 'NEW_MESSAGE',
                        userId: member.userId,
                        data: {
                            groupId: message.groupId,
                            studentName: group?.student?.name ?? '',
                            senderName: `${sender.firstName} ${sender.lastName}`,
                            content: message.content,
                        },
                    });
                }
            }
        });
    } catch (e: any) {
        console.error(`ERROR::createMessage: Failed to create messages: ${e.message}`);
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
