import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {DirectoryStatus, Requirement, RequirementStatus} from "@prisma/client";

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

const getRequirementsByCourseId = async (courseId: string) => {
    const requirements = await prisma.requirement.findMany({
        where: {
            requirementsOnCourses: {
                some: {
                    courseId: courseId,
                },
            },
        },
    });

    return {
        isValid: !!requirements,
        data: requirements,
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
    let requirement: Requirement | null = null;

    try {
        await prisma.$transaction(async (t) => {
            const organisation = await t.organisation.findUnique({
                where: { id: data.organisationId },
                include: {
                    students: {
                        include: {
                            course: true,
                            }
                    }},
            });

            if (!organisation) {
                logger.error(`No organisation found with id ${data.organisationId}`);
                throw new Error(`No organisation found with id ${data.organisationId}`);
            }

            requirement = await t.requirement.create({
                data: {
                    details: data.details,
                    type: data.type,
                    status: RequirementStatus.REQUIRED,
                    name: data.name,
                    organisation: {
                        connect: { id: data.organisationId },
                    },
                    ...(data?.countries && {
                        requirementsOnCountries: {
                            create: data.countries.map((country: string) => ({
                                country: {
                                    connectOrCreate: {
                                        where: { name: country },
                                        create: { name: country },
                                    },
                                },
                            })),
                        },
                    }),
                    ...(data?.courseIds && {
                        requirementsOnCourses: {
                            create: data.courseIds.map((courseId: string) => ({
                                course: { connect: { id: courseId } },
                            })),
                        },
                    }),
                    ...(data.exampleImages && {
                        exampleImages: {
                            create: data.exampleImages?.map((image: any) => ({
                                url: image.url,
                            })),
                        },
                    }),
                },
            });

            if (organisation.students.length > 0 && requirement) {
                for (const student of organisation.students) {
                    const isCountryRelevant = data?.countries?.includes(student.country);
                    const isCourseRelevant = data?.courseIds?.includes(student.course.id);
                    const isGeneralRequirement = !data?.countries && !data?.courseIds;

                    if (isGeneralRequirement || (isCountryRelevant && isCourseRelevant)) {
                        await t.directory.create({
                            data: {
                                requirementId: requirement.id,
                                studentId: student.id,
                                status: DirectoryStatus.IN_PROGRESS,
                            },
                        });
                    }
                }
            }

        });
    } catch (e: any) {
        console.error(e.message);
        return {
            isValid: false,
            data: null,
        };
    }

    return {
        isValid: requirement !== null,
        data: requirement,
    };
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
