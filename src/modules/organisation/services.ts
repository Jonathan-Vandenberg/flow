import prisma from "../../../prisma/prisma";
import {Role} from "@prisma/client";

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
            include: {
                country: true,
                students: {
                    include: { course: true },
                    orderBy: { createdAt: 'desc' },
                },
                courses: {
                    orderBy: { createdAt: 'desc' },
                },
                requirements: {
                    include: { exampleImages: true,
                        requirementsOnCourses: {
                            include: {
                                requirement: true,
                                course: true
                            },
                        },
                        requirementsOnCountries: {
                        include: {
                            requirement: true,
                            country: true
                        }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                },
                usersOnOrganisations: {
                  include: {
                      user: {
                          include: {
                              country: true
                          }
                      }
                  }
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
                                agenciesOnCountries: {
                                    include: {
                                        country: true
                                    }
                                },
                                usersOnAgencies: {
                                    include: {
                                        user: {
                                            include: {
                                                country: true
                                            }
                                        }
                                    }
                                }
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
