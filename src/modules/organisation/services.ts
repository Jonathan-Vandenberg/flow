import prisma from "../../../prisma/prisma";
import {Role} from "@prisma/client";

const createOrganisation = async (data: any) => {
    let organisation;
    try {
        organisation = await prisma.$transaction(async (tx) => {
            return tx.organisation.create({
                data: {
                    name: data.name,
                    country: {
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
                    locations: {
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
            include: {
                students: {
                    include: { course: true },
                    orderBy: { createdAt: 'desc' },
                },
                courses: {
                    orderBy: { createdAt: 'desc' },
                },
                requirements: {
                    include: { exampleImages: true },
                    orderBy: { createdAt: 'desc' },
                },
                agenciesOnOrganisations: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        agency: {
                            include: {
                                students: {
                                    include: { course: true },
                                    orderBy: { createdAt: 'desc' },
                                },
                                contacts: {
                                    orderBy: { createdAt: 'desc' },
                                },
                            },
                        },
                        user: true,
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

export default {
    createOrganisation,
    getOrganisationById
}
