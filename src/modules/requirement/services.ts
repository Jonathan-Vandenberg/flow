import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {DirectoryStatus} from "@prisma/client";

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

const createRequirement = async (data: any) => {
    let requirement;

    await prisma.$transaction(async (t) => {
        const existingCountries = await t.country.findMany({
            where: {
                name: {
                    in: data.country,
                },
            },
        });

        const existingCountryNames = existingCountries.map((country) => country.name);
        const newCountryNames = data.countries.filter(
            (country: string) => !existingCountryNames.includes(country)
        );

        const newCountries = await Promise.all(
            newCountryNames.map((country: string) =>
                t.country.create({
                    data: {
                        name: country,
                    },
                })
            )
        );

        const organisation = await t.organisation.findUnique({
            where: { id: data.organisationId },
            include: { students: true },
        });

        if (!organisation) {
            logger.error(`No organisation found with id ${data.organisationId}`);
            return;
        }

        requirement = await t.requirement.create({
            data: {
                status: data.status,
                details: data.details,
                type: data.type,
                requirementsOnCountries: {
                    create: [
                        ...existingCountries.map((country) => ({
                            country: { connect: { id: country.id } },
                        })),
                        ...newCountries.map((country) => ({
                            country: { create: { id: country.id, name: country.name } },
                        })),
                    ],
                },
                requirementsOnCourses: {
                    create: data.courseIds.map((courseId: string) => ({
                        course: { connect: { id: courseId } },
                    })),
                },
                exampleImages: {
                    create: data.exampleImages?.map((image: any) => ({
                        url: image.url,
                    })),
                },
            },
        });

        if (!requirement) {
            logger.error(`Could not create requirement`);
            return;
        }

        if (organisation.students.length > 0) {
            for (const student of organisation.students) {
                await t.directory.create({
                    data: {
                        requirementId: requirement.id,
                        studentId: student.id,
                        status: DirectoryStatus.IN_PROGRESS,
                    },
                });
            }
        }
    });

    return { isValid: !!requirement, data: requirement };
};

const updateRequirement = async (data: any
) => {
    let requirement;

    await prisma.$transaction(async (t) => {
         requirement = await t.requirement.update({
            where: {
                id: data.id,
            },
            data
        })

        // for (const image of data.exampleImages) {
        //     await t.exampleImage.update({
        //         where:{
        //             id: image.requirementId
        //         },
        //         data: {
        //             requirementId: requirement.id,
        //             url: image.url
        //         }
        //     });
        // }
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
