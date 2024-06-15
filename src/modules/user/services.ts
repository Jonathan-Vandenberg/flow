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
                    select: {
                        userId: true,
                        organisationId: true,
                        role: true,
                        organisation: {
                            select: {
                                id: true,
                                countryId: true,
                                name: true,
                                subStatus: true,
                                imageUrl: true,
                                country: {
                                    select: {
                                        name: true,
                                    }
                                },
                            }
                        },
                    },
                },
                usersOnAgencies: {
                    select: {
                        userId: true,
                        agencyId: true,
                        role: true,
                        agency: {
                            select: {
                                id: true,
                                name: true,
                                sector: true,
                                district: true,
                                market: true,
                                students: true,
                                agenciesOnCountries: {
                                    select: {
                                        agencyId: true,
                                        countryId: true,
                                        country: {
                                            select: {
                                                name: true,
                                                id: true
                                            }
                                        },
                                    },
                                },
                                usersOnAgencies: {
                                    select: {
                                        userId: true,
                                        agencyId: true,
                                        role: true,
                                        user: {
                                            select: {
                                                id: true,
                                                managerId: true,
                                                expertiseArea: true,
                                                email: true,
                                                firstName: true,
                                                lastName: true,
                                                mobile: true,
                                                countryId: true,
                                                imageUrl: true,
                                                country: true,
                                            },
                                        },
                                        agency: {
                                            select: {
                                                id: true,
                                                name: true,
                                                sector: true,
                                                district: true,
                                                market: true,
                                                commissionPercentage: true,
                                            }
                                        },
                                    },
                                },
                                contacts: {
                                    select: {
                                        id: true,
                                        agencyId: true,
                                        name: true,
                                        title: true,
                                        email: true,
                                        mobile: true,
                                    }
                                },
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
                    select: {
                        userId: true,
                        organisationId: true,
                        role: true,
                        organisation: {
                            select: {
                                id: true,
                                countryId: true,
                                name: true,
                                subStatus: true,
                                imageUrl: true,
                                country: {
                                    select: {
                                        name: true,
                                    }
                                },
                            }
                        },
                    },
                },
                usersOnAgencies: {
                    select: {
                        userId: true,
                        agencyId: true,
                        role: true,
                        agency: {
                            select: {
                                id: true,
                                name: true,
                                sector: true,
                                district: true,
                                market: true,
                                students: true,
                                agenciesOnCountries: {
                                    select: {
                                        agencyId: true,
                                        countryId: true,
                                        country: {
                                            select: {
                                                name: true,
                                                id: true
                                            }
                                        },
                                    },
                                },
                                usersOnAgencies: {
                                    select: {
                                        userId: true,
                                        agencyId: true,
                                        role: true,
                                        user: {
                                            select: {
                                                id: true,
                                                managerId: true,
                                                expertiseArea: true,
                                                email: true,
                                                firstName: true,
                                                lastName: true,
                                                mobile: true,
                                                countryId: true,
                                                imageUrl: true,
                                                country: true,
                                            },
                                        },
                                        agency: {
                                            select: {
                                                id: true,
                                                name: true,
                                                sector: true,
                                                district: true,
                                                market: true,
                                                commissionPercentage: true,
                                            }
                                        },
                                    },
                                },
                                contacts: {
                                    select: {
                                        id: true,
                                        agencyId: true,
                                        name: true,
                                        title: true,
                                        email: true,
                                        mobile: true,
                                    }
                                },
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
    let user: User | null = null;
    let errorMessage;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: createUserData.email },
        });

        if (existingUser) {
            if (createUserData.role === Role.AGENT && createUserData.agencyId) {
                user = await prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        usersOnOrganisations: {
                            connectOrCreate: {
                                where: {
                                    userId_organisationId: {
                                        userId: existingUser.id,
                                        organisationId: createUserData.organisationId,
                                    },
                                },
                                create: {
                                    role: createUserData.role,
                                    organisation: {
                                        connect: { id: createUserData.organisationId },
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
                user = await prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        usersOnOrganisations: {
                            connectOrCreate: {
                                where: {
                                    userId_organisationId: {
                                        userId: existingUser.id,
                                        organisationId: createUserData.organisationId,
                                    },
                                },
                                create: {
                                    role: createUserData.role,
                                    organisation: {
                                        connect: { id: createUserData.organisationId },
                                    },
                                },
                            },
                        },
                    },
                });
            }
        } else {
            const userData = {
                firstName: createUserData.firstName,
                lastName: createUserData.lastName,
                email: createUserData.email,
                imageUrl: createUserData.imageUrl,
                expertiseArea: createUserData.expertiseArea,
                country: {
                    connectOrCreate: {
                        where: { name: createUserData.country },
                        create: { name: createUserData.country },
                    },
                },
            };

            if (createUserData.role === Role.ADMIN || createUserData.role === Role.MANAGER) {
                user = await prisma.user.create({
                    data: {
                        ...userData,
                        usersOnOrganisations: {
                            create: {
                                role: createUserData.role,
                                organisation: {
                                    connect: { id: createUserData.organisationId },
                                },
                            },
                        },
                    },
                });
            } else if (createUserData.role === Role.AGENT && createUserData.agencyId) {
                user = await prisma.user.create({
                    data: {
                        ...userData,
                        managerId: createUserData.managerId,
                        usersOnOrganisations: {
                            create: {
                                role: createUserData.role,
                                organisation: {
                                    connect: { id: createUserData.organisationId },
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
                user = await prisma.user.create({
                    data: userData,
                });
            }
        }
    } catch (e: any) {
        errorMessage = e.message;
        console.log('ERROR::ADD_USER:', e.message);
    }

    return {
        isValid: !!user?.id,
        message: !!user?.id ? 'User associated with organization successfully' : `Failed to associate user: ${errorMessage}`,
        data: user,
    };
};

const createUserOrg = async (createUserOrgData: any): Promise<{ isValid: boolean; message: string, data: any }> => {
    let errorMessage;
    try {
        const user = await prisma.user.create({
            data: {
                firstName: createUserOrgData.firstName,
                lastName: createUserOrgData.lastName,
                email: createUserOrgData.email,
                country: {
                    connectOrCreate: {
                        where: { name: createUserOrgData.userCountry },
                        create: { name: createUserOrgData.userCountry },
                    },
                },
                usersOnOrganisations: {
                    create: {
                        role: Role.ADMIN,
                        organisation: {
                            create: {
                                name: createUserOrgData.orgName,
                                country: {
                                    connectOrCreate: {
                                        where: { name: createUserOrgData.orgCountry },
                                        create: { name: createUserOrgData.orgCountry },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            include: {
                country: true,
                usersOnOrganisations: {
                    include: {
                        organisation: true,
                    },
                },
            },
        });

        return {
            isValid: true,
            message: "User and organization created successfully",
            data: user,
        };

    } catch (e: any) {
        errorMessage = e.message;
        console.log('ERROR::ADD_USER_ORG:', e.message);

        return {
            isValid: false,
            message: `Failed to create user and organization: ${errorMessage}`,
            data: null,
        };
    }
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
                // expertiseArea: updateUserData.expertiseArea,
                // country: {
                //     update: {
                //         name: updateUserData.countryName,
                //     },
                // },
                // managedStudents: {
                //     connect: updateUserData.managedStudentIds.map((id: string) => ({ id })),
                // },
                // socialMedia: {
                //     create: updateUserData.newSocialMedia,
                //     update: updateUserData.existingSocialMedia.map((media: any) => ({
                //         where: { id: media.id },
                //         data: media,
                //     })),
                //     delete: updateUserData.deleteSocialMediaIds.map((id: string) => ({ id })),
                // },
                // usersOnOrganisations: {
                //     create: updateUserData.newOrganisations,
                //     update: updateUserData.existingOrganisations.map((org: any) => ({
                //         where: { id: org.id },
                //         data: org,
                //     })),
                //     delete: updateUserData.deleteOrganisationIds.map((id: string) => ({ id })),
                // },
                // agenciesOnOrganisations: {
                //     create: updateUserData.newAgencies,
                //     update: updateUserData.existingAgencies.map((agency: any) => ({
                //         where: { id: agency.id },
                //         data: agency,
                //     })),
                //     delete: updateUserData.deleteAgencyIds.map((id: string) => ({ id })),
                // },
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
    createUserOrg,
    updateUser,
    getUserById,
    getUserByEmail,
    getUserByOrganisationId
};
