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

const getUsersOnOrganisations = async (id: string) => {
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
                            },
                        },
                    },
                },
            },
        });

        return {
            isValid: organisation?.usersOnOrganisations?.length ?? 0 > 0,
            data: organisation?.usersOnOrganisations ?? [],
        };
    } catch (e: any) {
        console.error(e.message);
        return null;
    }
};

const getAgenciesOnOrganisations = async (id: string) => {
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
                                        status: true
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

        return {
            isValid: organisation?.agenciesOnOrganisations?.length ?? 0 > 0,
            data: organisation?.agenciesOnOrganisations ?? [],
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
