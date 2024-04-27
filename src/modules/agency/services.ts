import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {Agent} from "@prisma/client";

const getAgenciesByManagerId = async (managerId: string
) => {
    const agencies = await prisma.agency.findMany({
        where: {
            managerId
        }
    })

    return {
        isValid: !!agencies,
        data: agencies
    };
};

const getAgencyById = async (id: string
) => {
    const agency = await prisma.agency.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!agency,
        data: agency
    };
};

const createAgency = async (data: any
) => {
    const agency = await prisma.agency.create({
        data
    })

    return {
        isValid: !!agency,
        data: agency
    };
};

const updateAgency = async (data: any
) => {
    const agency = await prisma.agency.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!agency,
        data: agency
    };
};

export default {
    getAgenciesByManagerId,
    getAgencyById,
    createAgency,
    updateAgency
}
