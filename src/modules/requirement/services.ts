import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";

const getRequirementsByOrgId = async (organisationId: string
) => {
    const requirements = await prisma.requirement.findMany({
        where: {
            organisationId
        }
    })

    return {
        isValid: !!requirements,
        data: requirements
    };
};

const getRequirementsByCourseId = async (courseId: string
) => {
    const requirements = await prisma.requirement.findMany({
        where: {
            courseId
        }
    })

    return {
        isValid: !!requirements,
        data: requirements
    };
};

const getRequirementsByStudentId = async (studentId: string
) => {
    const requirements = await prisma.requirement.findMany({
        where: {
            studentId
        }
    })

    return {
        isValid: !!requirements,
        data: requirements
    };
};

const getRequirementById = async (id: string
) => {
    const requirement = await prisma.requirement.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!requirement,
        data: requirement
    };
};

const createRequirement = async (data: any
) => {
    const requirement = await prisma.requirement.create({
        data
    })

    return {
        isValid: !!requirement,
        data: requirement
    };
};

const updateRequirement = async (data: any
) => {
    const requirement = await prisma.requirement.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!requirement,
        data: requirement
    };
};

export default {
    getRequirementsByOrgId,
    getRequirementsByCourseId,
    getRequirementsByStudentId,
    getRequirementById,
    createRequirement,
    updateRequirement
}
