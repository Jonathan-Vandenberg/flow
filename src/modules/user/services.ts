import prisma from '../../../prisma/prisma';
import {Role, User, UsersOnOrganisations} from "@prisma/client";
import {logger} from "../../utils/logger";
import {create} from "domain";
import {createUserController} from "./controller";


const getUserById = async (id: string): Promise<{ isValid: boolean; message: string; data: any }> => {
    let user: User | null = null;
    let errorMessage;

    try {
        user = await prisma.user.findUnique({
            where: { id },
            include: {
                country: true,
                managedStudents: true,
                socialMedia: true,
                usersOnOrganisations: {
                    include: {
                        organisation: true,
                    },
                },
                usersOnAgencies: {
                    include: {
                        agency: {
                            include: {
                                students: true,
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
                                        },
                                        agency: true,
                                    }
                                },
                                contacts: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (e: any) {
        errorMessage = e.message;
        logger.error(`ERROR::getUserById::${e.message}`);
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : `Failed to fetch User: ${errorMessage}`,
        data: user,
    };
};

const getUserByEmail = async (
    email: string
): Promise<{ isValid: boolean; message: string; data: any }> => {
    let user: User | null = null;
    let errorMessage;

    try {
        user = await prisma.user.findUnique({
            where: { email },
            include: {
                country: true,
                managedStudents: true,
                socialMedia: true,
                usersOnOrganisations: {
                    include: {
                        organisation: true,
                    },
                },
                usersOnAgencies: {
                    include: {
                        agency: {
                            include: {
                                students: true,
                                agenciesOnCountries: {
                                    include: {
                                        country: true,
                                    },
                                },
                                usersOnAgencies: {
                                    include: {
                                        user: {
                                            include: {
                                                country: true,
                                            },
                                        },
                                        agency: true,
                                    },
                                },
                                contacts: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (e: any) {
        errorMessage = e.message;
        logger.error(`ERROR::getUserByEmail::${e.message}`);
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : `Failed to fetch User: ${errorMessage}`,
        data: user,
    };
};

const getUserByOrganisationId = async (
    id: string
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let users
    let errorMessage

    try {
        users = await prisma.usersOnOrganisations.findMany({
            where: { organisationId: id },
            include: {
                user: true
            }
        })
    } catch(e: any){
        errorMessage = e.message
        logger.error(`ERROR::getUserByOrganisationId::${e.message}`)
    }

    return {
        isValid: !!users,
        message: users ? "Fetched Users Successfully" : `Failed to fetch Users: ${errorMessage}`,
        data: users
    };
};

const createUser = async (createUserData: any): Promise<{ isValid: boolean; message: string; data: any }> => {
    let user;
    let errorMessage;

    try {
        const existingCountry = await prisma.country.findUnique({
            where: {
                name: createUserData.country,
            },
        });

        const userData = {
            firstName: createUserData.firstName,
            lastName: createUserData.lastName,
            email: createUserData.email,
            imageUrl: createUserData.imageUrl,
            expertiseArea: createUserData.expertiseArea,
            country: existingCountry
                ? {
                    connect: {
                        id: existingCountry.id,
                    },
                }
                : {
                    create: {
                        name: createUserData.country,
                    },
                },
        };

        if (createUserData.role === Role.ADMIN || createUserData.role === Role.MANAGER) {
            // If the user role is ADMIN or MANAGER, create the user and associate with the organization (if provided)
            user = await prisma.user.create({
                data: {
                    ...userData,
                    usersOnOrganisations: {
                        create: {
                            role: createUserData.role,
                            organisation: {
                                connect: {
                                    id: createUserData.organisationId,
                                },
                            },
                        },
                    },
                },
            });
        } else if (createUserData.role === Role.AGENT && createUserData.agencyId) {
            // If the user role is AGENT and agencyId is provided, create the user and associate with the agency
            user = await prisma.user.create({
                data: {
                    ...userData,
                    usersOnOrganisations: {
                        create: {
                            role: createUserData.role,
                            organisation: {
                                connect: {
                                    id: createUserData.organisationId,
                                },
                            },
                        },
                    },
                    usersOnAgencies: {
                        create: {
                            role: createUserData.role,
                            email: createUserData.email,
                            agency: {
                                connect: { id: createUserData.agencyId },
                            },
                        },
                    },
                },
            });
        } else {
            // If the user role is not ADMIN, MANAGER, or AGENT with agencyId, create the user without any associations
            user = await prisma.user.create({
                data: userData,
            });
        }
    } catch (e: any) {
        errorMessage = e.message;
        console.log('ERROR::ADD_USER:', e.message);
    }

    return {
        isValid: !!user,
        message: user ? 'Created User Successfully' : `Failed to create User: ${errorMessage}`,
        data: user,
    };
};

const updateUser = async (
    updateUserData: any
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user
    let errorMessage

    try{
        user = await prisma.user.update({
            where: { id: updateUserData.id },
            data: {
                firstName: updateUserData.firstName,
                lastName: updateUserData.lastName,
                email: updateUserData.email,
                mobile: updateUserData.mobile,
                imageUrl: updateUserData.imageUrl,
                expertiseArea: updateUserData.expertiseArea,
                country: {
                    update: {
                        name: updateUserData.countryName,
                    },
                },
                managedStudents: {
                    connect: updateUserData.managedStudentIds.map((id: string) => ({ id })),
                },
                socialMedia: {
                    create: updateUserData.newSocialMedia,
                    update: updateUserData.existingSocialMedia.map((media: any) => ({
                        where: { id: media.id },
                        data: media,
                    })),
                    delete: updateUserData.deleteSocialMediaIds.map((id: string) => ({ id })),
                },
                usersOnOrganisations: {
                    create: updateUserData.newOrganisations,
                    update: updateUserData.existingOrganisations.map((org: any) => ({
                        where: { id: org.id },
                        data: org,
                    })),
                    delete: updateUserData.deleteOrganisationIds.map((id: string) => ({ id })),
                },
                agenciesOnOrganisations: {
                    create: updateUserData.newAgencies,
                    update: updateUserData.existingAgencies.map((agency: any) => ({
                        where: { id: agency.id },
                        data: agency,
                    })),
                    delete: updateUserData.deleteAgencyIds.map((id: string) => ({ id })),
                },
            },
        });
    }catch(e: any){
        errorMessage = e.message
        console.log('ERROR::UPDATE_USER:', e.message)
    }

    return {
        isValid: !!user,
        message: user ? "Updated User Successfully" : `Failed to update user: ${errorMessage}`,
        data: user
    };
};

export default {
    createUser,
    updateUser,
    getUserById,
    getUserByEmail,
    getUserByOrganisationId
};
