import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {DirectoryStatus, NotificationType, Requirement, RequirementStatus, StudentStatus} from "@prisma/client";
import {createNotification} from "../notification/services";

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
                    ...(data?.studentId && {
                        student: {
                            connect: {
                                id: data?.studentId
                            }
                        }
                    }),
                    ...(data?.countries?.filter(Boolean).length > 0 && {
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
                    ...(data?.courseIds?.filter(Boolean).length > 0 && {
                        requirementsOnCourses: {
                            create: data.courseIds.map((courseId: string) => ({
                                course: { connect: { id: courseId } },
                            })),
                        },
                    }),
                    ...(data?.exampleImages?.filter(Boolean).length > 0 && {
                        exampleImages: {
                            create: data.exampleImages?.map((image: any) => ({
                                url: image.url,
                            })),
                        },
                    }),
                },
            });

            if (organisation.students.length > 0 && requirement && !data?.studentId) {
                for (const student of organisation.students) {
                    const isCountryRelevant = data?.countries?.includes(student.country);
                    const isCourseRelevant = data?.courseIds?.includes(student.course?.id);
                    const isGeneralRequirement = data?.countries?.length === 0 && data?.courseIds?.length === 0

                    if (isGeneralRequirement || isCountryRelevant || isCourseRelevant) {
                        await t.directory.create({
                            data: {
                                requirement: {
                                    connect: {
                                        id: requirement.id,
                                    },
                                },
                                student: {
                                    connect: {
                                        id: student.id,
                                    },
                                },
                                status: DirectoryStatus.IN_PROGRESS,
                            },
                        });

                        // TODO email/notification
                    }
                }
            }

            if(data?.studentId){
                await t.directory.create({
                    data: {
                        requirement: {
                            connect: {
                                id: requirement.id,
                            },
                        },
                        student: {
                            connect: {
                                id: data?.studentId,
                            },
                        },
                        status: DirectoryStatus.IN_PROGRESS,
                    },
                });

                const studentDirectories = await t.directory.findMany({
                    where: { studentId: data?.studentId },
                    select: { status: true },
                });

                const allDirectoriesComplete = studentDirectories.every(
                    (dir) => dir.status === DirectoryStatus.COMPLETE
                );

                if (allDirectoriesComplete) {
                    await t.student.update({
                        where: { id: data?.studentId },
                        data: { status: StudentStatus.ACCEPTED },
                    });
                } else {
                    await t.student.update({
                        where: { id: data?.studentId },
                        data: { status: StudentStatus.PENDING },
                    });
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

const updateRequirement = async (data: any) => {
    try {
        await prisma.$transaction(async (t) => {
            const updatedRequirement = await t.requirement.update({
                where: { id: data.id },
                data,
                select: { id: true, organisationId: true }
            });

            if (!updatedRequirement.organisationId) {
                console.log(`No organisation found for this requirement: ${updatedRequirement.id}`);
                return updatedRequirement;
            }

            const organisation = await t.organisation.findUnique({
                where: { id: updatedRequirement.organisationId },
                select: {
                    usersOnOrganisations: {
                        select: { userId: true }
                    }
                }
            });

            if (!organisation) {
                console.log('No organisation found!');
                return updatedRequirement;
            }

            // Handle example images if needed
            // for (const image of data.exampleImages) {
            //   await t.exampleImage.upsert({
            //     where: { id: image.id },
            //     update: { url: image.url },
            //     create: { requirementId: updatedRequirement.id, url: image.url }
            //   });
            // }

            // Create notifications for all users in the organisation
            const notificationPromises = organisation.usersOnOrganisations.map(user =>
                t.notification.create({
                    data: {
                        type: NotificationType.REQUIREMENT_UPDATED,
                        userId: user.userId,
                        data: {
                            requirementId: updatedRequirement.id,
                            name: data.name,
                            requirementType: data.type,
                        },
                    }
                })
            );

            await Promise.all(notificationPromises);

        return { isValid: !!updatedRequirement, data: updatedRequirement };
        });
    } catch (error) {
        console.error('Error updating requirement:', error);
        return { isValid: false, error: 'Failed to update requirement' };
    }
};

export default {
    getRequirementsByOrgId,
    getRequirementsByCourseId,
    getRequirementsByStudentId,
    getRequirementById,
    createRequirement,
    updateRequirement
}
