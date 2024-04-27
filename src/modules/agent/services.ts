import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {Agent} from "@prisma/client";

const getAgentsByAgencyId = async (agencyId: string
) => {
    const agents = await prisma.agent.findMany({
        where: {
            agencyId
        }
    })

    return {
        isValid: !!agents,
        data: agents
    };
};

const getAgentById = async (id: string
) => {
    const agent = await prisma.agent.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!agent,
        data: agent
    };
};

const createAgent = async (data: any
) => {
    const agent = await prisma.agent.create({
        data
    })

    return {
        isValid: !!agent,
        data: agent
    };
};

const updateAgent = async (data: any
) => {
    const agent = await prisma.agent.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!agent,
        data: agent
    };
};

export default {
    getAgentsByAgencyId,
    getAgentById,
    createAgent,
    updateAgent
}
