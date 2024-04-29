import prisma from '../../../prisma/prisma';
import {Role} from "@prisma/client";
import {logger} from "../../utils/logger";
import {UserArgs} from "@prisma/client/runtime/library";
import {createOrganisationController} from "../organisation/controllers";
import {create} from "domain";

const getUserById = async (
    id: string
): Promise<{ isValid: boolean; message: string }> => {
    let user

    try {
        user = await prisma.user.findUnique({
                where: { id }
        })
    } catch(e: any){
        logger.error(`ERROR::getUserById::${e.message}`)
    }

    return {
        isValid: !!user,
        message: user ? "Fetched User Successfully" : "Failed to fetch User"
    };
};

const createUser = async (
   createUserData: any
): Promise<{ isValid: boolean; message: string }> => {
    const user = await prisma.user.create({
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

    return {
        isValid: !!user,
        message: user ? 'Created User Successfully' : 'Failed to create User'
    };
};

export default {
    createUser,
    getUserById
};
