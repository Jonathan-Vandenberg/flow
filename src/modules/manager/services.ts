import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";

const getManagersByOrgId = async (organisationId: string
) => {
    const managers = await prisma.manager.findMany({
        where: {
            organisationId
        }
    })

    return {
        isValid: !!managers,
        data: managers
    };
};

const getManagerById = async (id: string
) => {
    const manager = await prisma.manager.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!manager,
        data: manager
    };
};

const createManager = async (data: any
) => {
    const manager = await prisma.manager.create({
        data
    })

    return {
        isValid: !!manager,
        data: manager
    };
};

const updateManager = async (data: any
) => {
    const manager = await prisma.manager.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!manager,
        data: manager
    };
};

export default {
    getManagersByOrgId,
    getManagerById,
    createManager,
    updateManager
}
