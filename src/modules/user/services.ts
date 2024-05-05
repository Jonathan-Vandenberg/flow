import prisma from '../../../prisma/prisma';
import {Role, User} from "@prisma/client";
import {logger} from "../../utils/logger";
import {UserArgs} from "@prisma/client/runtime/library";
import {createOrganisationController} from "../organisation/controllers";
import {create} from "domain";

const getUserById = async (
    id: string
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user
    let errorMessage

    try {
        user = await prisma.user.findUnique({
                where: { id },
                include: {
                    managedStudents: true,
                    managedAgencies: true
                }
        })
    } catch(e: any){
        errorMessage = e.message
        logger.error(`ERROR::getUserById::${e.message}`)
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : `Failed to fetch User: ${errorMessage}`,
        data: user
    };
};

const getUserByEmail = async (
    email: string
): Promise<{ isValid: boolean; message: string, data: any }> => {
    let user
    let errorMessage

    try {
        user = await prisma.user.findUnique({
            where: { email },
            include: {
                organisation: true
            }
        })
    } catch(e: any){
        errorMessage = e.message
        logger.error(`ERROR::getUserByEmail::${e.message}`)
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : `Failed to fetch User: ${errorMessage}`,
        data: user
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
                mobile: createUserData.mobile,
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

export default {
    createUser,
    getUserById,
    getUserByEmail,
    getUsersByOrganisationId
};
