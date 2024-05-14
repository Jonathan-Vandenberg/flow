import prisma from '../../../prisma/prisma';
import {Agency, Organisation, Role, User} from "@prisma/client";
import {logger} from "../../utils/logger";
import {UserArgs} from "@prisma/client/runtime/library";
import {createOrganisationController} from "../organisation/controllers";
import {create} from "domain";

const getUserById = async (
    id: string
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user: User | null = null;
    let agencies
    let organisation
    let errorMessage

    try {
        user = await prisma.user.findUnique({
                where: { id },
                include: {
                    managedStudents: true,
                    managedAgencies: true,
                    agenciesOnUsers: true
                }
        })

        console.log(1, "User", user)
        if(user && user.organisationId){
             organisation = await prisma.organisation.findUnique({
                where: {
                    id: user?.organisationId
                },
                select: {
                    agenciesOnOrganisations: true
                }
            })
        }


        if (user && organisation?.agenciesOnOrganisations.length) {
            const managedAgencies = organisation?.agenciesOnOrganisations.filter((agency) => agency.managerId === id);
            const agencyIds = managedAgencies.map((agency) => agency.agencyId);
            agencies = await prisma.agency.findMany({
                where: {
                    id: { in: agencyIds }
                },
                include: {
                    students: true,
                    user: true,
                    contacts: true
                }
            });
        }
    } catch(e: any){
        errorMessage = e.message
        logger.error(`ERROR::getUserById::${e.message}`)
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : `Failed to fetch User: ${errorMessage}`,
        data: {...user, agencies}
    };
};

const getUserByEmail = async (
    email: string
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user: User | null = null;
    let agencies
    let organisation
    let errorMessage

    try {
        user = await prisma.user.findUnique({
            where: { email },
            include: {
                organisation: true,
                managedAgencies: true,
                managedStudents: true,
                agenciesOnUsers: true
            }
        })

        if(user && user.organisationId){
            organisation = await prisma.organisation.findUnique({
                where: {
                    id: user?.organisationId
                },
                select: {
                    agenciesOnOrganisations: true
                }
            })
        }

        if (user && organisation?.agenciesOnOrganisations.length) {
            const managedAgencies = organisation?.agenciesOnOrganisations.filter((agency) => agency.managerId === user?.id);
            const agencyIds = managedAgencies.map((agency) => agency.agencyId);
            agencies = await prisma.agency.findMany({
                where: {
                    id: { in: agencyIds }
                },
                include: {
                    students: true,
                    user: true,
                    contacts: true
                }
            });
        }
    } catch(e: any){
        errorMessage = e.message
        logger.error(`ERROR::getUserByEmail::${e.message}`)
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : `Failed to fetch User: ${errorMessage}`,
        data: {...user, agencies}
    };
};

const getUsersByOrganisationId = async (
    id: string
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let users
    let errorMessage

    try {
        users = await prisma.user.findMany({
            where: { organisationId: id }
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

const createUser = async (
   createUserData: any
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user
    let errorMessage

    try{
        user = await prisma.user.create({
            data: {
                agencyId: createUserData.agencyId,
                managerId: createUserData.managerId,
                organisationId: createUserData.organisationId,
                firstName: createUserData.firstName,
                lastName: createUserData.lastName,
                email: createUserData.email,
                role: createUserData.role,
                imageUrl: createUserData.imageUrl,
                expertiseArea: createUserData.expertiseArea
            }
        });
    }catch(e: any){
        errorMessage = e.message
        console.log('ERROR::ADD_USER:', e.message)
    }

    return {
        isValid: !!user,
        message: user ? "Created User Successfully" : `Created to fetch User: ${errorMessage}`,
        data: user
    };
};

const createUserOrg = async (
    createUserOrgData: any
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user
    let organisation
    let errorMessage

    try{
        const result = await prisma.user.create({
            data: {
                firstName: createUserOrgData.firstName,
                lastName: createUserOrgData.lastName,
                email: createUserOrgData.email,
                role: Role.ADMIN,
                organisation: {
                    create: {
                        name: createUserOrgData.name,
                        country: createUserOrgData.country,
                    },
                },
            },
            include: {
                organisation: {
                    include: {
                        users: true
                    }
                },
            },
        });

        user = result;
        organisation = result.organisation;

    }catch(e: any){
        errorMessage = e.message
        console.log('ERROR::ADD_USER_ORG:', e.message)
    }

    return {
        isValid: !!user,
        message: user ? "Created User Successfully" : `Created to fetch User: ${errorMessage}`,
        data: {user, organisation}
    };
};

const updateUser = async (
    updateUserData: any
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user
    let errorMessage

    try{
        user = await prisma.user.update({
            where: {id: updateUserData.id},
            data: {
                agencyId: updateUserData.agencyId,
                managerId: updateUserData.managerId,
                organisationId: updateUserData.organisationId,
                firstName: updateUserData.firstName,
                lastName: updateUserData.lastName,
                email: updateUserData.email,
                mobile: updateUserData.mobile,
                role: updateUserData.role,
                imageUrl: updateUserData.imageUrl,
                expertiseArea: updateUserData.expertiseArea
            }
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
    getUsersByOrganisationId
};
