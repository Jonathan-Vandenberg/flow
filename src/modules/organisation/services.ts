import prisma from "../../../prisma/prisma";
import {AgenciesOnOrganisations, Role} from "@prisma/client";

const createOrganisation = async (data: any) => {
    let organisation;

    const existingCountry = await prisma.country.findUnique({
        where: {
            name: data.country,
        },
    });

    try {
        organisation = await prisma.$transaction(async (tx) => {
            return tx.organisation.create({
                data: {
                    name: data.name,
                    country: existingCountry
                        ? {
                            connect: {
                                id: existingCountry.id,
                            },
                        }
                        : {
                            create: {
                                name: data.country,
                            },
                        },
                    usersOnOrganisations: {
                        create: {
                            user: {
                                connect: {
                                    id: data.userId,
                                },
                            },
                            role: Role.ADMIN,
                        },
                    },
                    organisationsOnLocations: {
                        createMany: {
                            data: data.locations.map((location: string) => ({
                                location,
                            })),
                        },
                    },
                },
            });
        });
    } catch (e: any) {
        console.log(e.message);
    }
    return { isValid: !!organisation, data: organisation };
};

const getOrganisationById = async (id: string) => {
    try {
        const organisation = await prisma.organisation.findUnique({
            where: { id },
            select: {
                id: true,
                countryId: true,
                name: true,
                subStatus: true,
                imageUrl: true,
                country: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                courses: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        name: true,
                    }
                },
                requirements: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        name: true,
                        details: true,
                        status: true,
                        type: true,
                        studentId: true,
                        exampleImages: true,
                        requirementsOnCourses: {
                            select: {
                                id: true,
                                requirementId: true,
                                courseId: true,
                                requirement: {
                                    select: {
                                        id: true,
                                        name: true,
                                        details: true,
                                        status: true,
                                        type: true,
                                        studentId: true,
                                    }
                                },
                                course: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            },
                        },
                        requirementsOnCountries: {
                        include: {
                            requirement: {
                                select: {
                                    id: true,
                                    name: true,
                                    details: true,
                                    status: true,
                                    type: true,
                                    studentId: true,
                                }
                            },
                            country: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                        }
                    },
                },
            },
        });

        return {
            isValid: !!organisation?.id,
            data: organisation
        };
    } catch (e: any) {
        console.error(e.message);
        return null;
    }
};

const getUsersOnOrganisations = async (id: string, userId: string) => {
    try {
        const organisation = await prisma.organisation.findUnique({
            where: { id },
            select: {
                id: true,
                usersOnOrganisations: {
                    include: {
                        user: {
                            include: {
                                country: true,
                                managedStudents: {
                                    orderBy: { createdAt: 'desc' },
                                    select: {
                                        directories: {
                                            orderBy: { createdAt: 'desc' },
                                            select: {
                                                documents: {
                                                    orderBy: { createdAt: 'desc' },
                                                    select: {
                                                        messages: {
                                                            orderBy: { createdAt: 'desc' },
                                                            where: {
                                                                isRead: false,
                                                                receiverId: userId,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const usersWithUnreadMessages = organisation?.usersOnOrganisations.map((userOnOrganisation: any) => {
            const unreadCount = userOnOrganisation.user.managedStudents?.reduce(
                (studentCount: number, student: any) => {
                    const unreadStudentCount = student?.directories?.reduce(
                        (dirCount: number, directory: any) => {
                            const unreadDirCount = directory?.documents?.reduce(
                                (docCount: number, document: any) => {
                                    return docCount + document?.messages?.length;
                                },
                                0,
                            );
                            return dirCount + unreadDirCount;
                        },
                        0,
                    );
                    return studentCount + unreadStudentCount;
                },
                0,
            );

            return {
                ...userOnOrganisation,
                user: {
                    ...userOnOrganisation.user,
                    unreadMessages: unreadCount,
                },
            };
        });

        return {
            isValid: organisation?.usersOnOrganisations?.length ?? 0 > 0,
            data: usersWithUnreadMessages ?? [],
        };
    } catch (e: any) {
        console.error(e.message);
        return null;
    }
};

const getAgenciesOnOrganisations = async (id: string, userId: string) => {
    try {
        const organisation = await prisma.organisation.findUnique({
            where: { id },
            select: {
                id: true,
                agenciesOnOrganisations: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        agency: {
                            include: {
                                students: {
                                    select: {
                                        course: true,
                                        directories: {
                                            select: {
                                                documents: {
                                                    select: {
                                                        messages: {
                                                            where: {
                                                                isRead: false,
                                                                receiverId: userId,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    orderBy: { createdAt: 'desc' },
                                },
                                contacts: { orderBy: { createdAt: 'desc' } },
                                agenciesOnCountries: { include: { country: true } },
                                usersOnAgencies: {
                                    orderBy: { createdAt: 'desc' },
                                    include: {
                                        user: {
                                            include: {
                                                country: true,
                                                managedStudents: {
                                                    orderBy: { createdAt: 'desc' },
                                                    select: {
                                                        directories: {
                                                            orderBy: { createdAt: 'desc' },
                                                            select: {
                                                                documents: {
                                                                    orderBy: { createdAt: 'desc' },
                                                                    select: {
                                                                        messages: {
                                                                            orderBy: { createdAt: 'desc' },
                                                                            where: {
                                                                                isRead: false,
                                                                                receiverId: userId,
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        user: true,
                    },
                },
            },
        });

        const agenciesWithUnreadMessages = organisation?.agenciesOnOrganisations.map((agencyOnOrganisation: any) => {
            const unreadMessagesOnDocuments = agencyOnOrganisation.agency?.students?.reduce(
                (count: number, student: any) => {
                    const unreadCount = student?.directories?.reduce(
                        (dirCount: number, directory: any) => {
                            const unreadDirCount = directory?.documents?.reduce(
                                (docCount: number, document: any) => {
                                    return docCount + document?.messages?.length;
                                },
                                0,
                            );
                            return dirCount + unreadDirCount;
                        },
                        0,
                    );
                    return count + unreadCount;
                },
                0,
            );

            const usersWithUnreadMessages = agencyOnOrganisation.agency?.usersOnAgencies?.map((userOnAgency: any) => {
                const unreadCount = userOnAgency.user.managedStudents?.reduce(
                    (studentCount: number, student: any) => {
                        const unreadStudentCount = student?.directories?.reduce(
                            (dirCount: number, directory: any) => {
                                const unreadDirCount = directory?.documents?.reduce(
                                    (docCount: number, document: any) => {
                                        return docCount + document?.messages?.length;
                                    },
                                    0,
                                );
                                return dirCount + unreadDirCount;
                            },
                            0,
                        );
                        return studentCount + unreadStudentCount;
                    },
                    0,
                );

                return {
                    ...userOnAgency,
                    user: {
                        ...userOnAgency.user,
                        unreadMessages: unreadCount,
                    },
                };
            });

            return {
                ...agencyOnOrganisation,
                unreadAgencyMessages: unreadMessagesOnDocuments,
                usersOnAgencies: usersWithUnreadMessages,
            };
        });

        return {
            isValid: organisation?.agenciesOnOrganisations?.length ?? 0 > 0,
            data: agenciesWithUnreadMessages ?? [],
        };
    } catch (e: any) {
        console.error(e.message);
        return null;
    }
};

export default {
    getAgenciesOnOrganisations,
    getUsersOnOrganisations,
    createOrganisation,
    getOrganisationById
}
