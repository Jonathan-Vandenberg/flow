import prisma from "../../../prisma/prisma";
import { v4 as uuidv4 } from 'uuid';
import {logger} from "../../utils/logger";
import {DirectoryStatus} from "@prisma/client";

const getAllStudentsByAgentId = async (agentId: string
) => {
    const students = await prisma.student.findMany({
        where: {
            agentId
        },
        include: {
            course: {
                select: {
                    name: true,
                }
            }
        }
    })

    return {
        isValid : !!students,
        data: students
    };
};

const getStudentById = async (id: string
) => {
    const student = await prisma.student.findUnique({
        where: {
            id
        },
        include: {
            course: true,
            agency: true,
            agent: true,
            group: {
                include: {
                    groupMembers: true
                }
            },
            directories: {
                include: {
                    documents: true,
                    requirement: true
                }
            }
        }
    })

    return {
        isValid: !!student,
        data: student
    };
};

const getStudentsByAgencyId = async (agencyId: string) => {
    const agency = await prisma.agency.findUnique({
        where: { id: agencyId },
        select: {
            students: {
                include: {
                    course: true,
                    agency: true,
                    agent: true,
                    directories: {
                        include: {
                            documents: true
                        },
                    },
                },
            },
        },
    });

    return {
        isValid: agency?.students?.length ?? 0 > 0,
        data: agency?.students,
    };
};

const getStudentsByOrganisationId = async (id: string) => {
    const organisation = await prisma.organisation.findUnique({
        where: { id },
        select: {
            students: {
                include: {
                    course: true,
                    agency: true,
                    agent: true,
                    directories: {
                        include: {
                            documents: true,
                        },
                    },
                },
            },
        },
    });

    return {
        isValid: organisation?.students?.length ?? 0 > 0,
        data: organisation?.students,
    };
};

const createStudent = async (data: any) => {
    let student;

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CREATING STUDENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    await prisma.$transaction(async (t) => {
        const organisation = await t.organisation.findUnique({
            where: { id: data.organisationId },
            include: {
                requirements: {
                    include: {
                        exampleImages: true,
                        requirementsOnCourses: {
                            include: {
                                requirement: true,
                                course: true
                            },
                        },
                        requirementsOnCountries: {
                            include: {
                                requirement: true,
                                country: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        console.log('ORGANISATION: ', organisation)

        if (!organisation) {
            console.log(`No organisation found with id ${data.organisationId}`)
            logger.error(`No organisation found with id ${data.organisationId}`);
            return;
        }

        const agent = await t.user.findUnique({
            where: {
                id: data.agentId
            },
            select: {
                id: true,
                managerId: true,
                email: true
            }
        })

        console.log('AGENT: ', agent)

        if(!agent || !agent.managerId){
            console.log(`No agent or manager ID found with agent ID ${data.agentId}`)
            logger.error(`No agent or manager ID found with agent ID ${data.agentId}`);
            return;
        }

        const manager = await t.user.findUnique({
            where: {
                id: agent.managerId
            },
            select: {
                id: true,
                email: true
            }
        })

        console.log('MANAGER: ', manager)

        if(!manager){
            console.log(`No manager found with agent ID ${data.agentId}`)
            logger.error(`No manager found with agent ID ${data.agentId}`);
            return;
        }

        try {
            student = await t.student.create({
                data: {
                    organisation: { connect: { id: data.organisationId } },
                    course: { connect: { id: data.courseId } },
                    agency: { connect: { id: data.agencyId } },
                    agent: { connect: { id: data.agentId } },
                    name: data.name,
                    age: data.age,
                    country: data.country,
                    expAttendDate: data.expAttendDate,
                    guardianMobile: data.guardianMobile,
                    guardianEmail: data.guardianEmail,
                    gapYearExplanation: data.gapYearExplanation,
                    previouslyRejected: data.previouslyRejected,
                    directories: {
                        create: [
                            ...organisation.requirements
                                .filter((requirement) =>
                                    requirement.requirementsOnCountries.length === 0 &&
                                    requirement.requirementsOnCourses.length === 0
                                )
                                .map((requirement) => ({
                                    requirement: { connect: { id: requirement.id } },
                                    status: DirectoryStatus.IN_PROGRESS,
                                })),
                            ...organisation.requirements
                                .filter((requirement) =>
                                    requirement.requirementsOnCountries.some(
                                        (roc) => roc.country.name === data.country
                                    )
                                )
                                .map((requirement) => ({
                                    requirement: { connect: { id: requirement.id } },
                                    status: DirectoryStatus.IN_PROGRESS,
                                })),
                            ...organisation.requirements
                                .filter((requirement) =>
                                    requirement.requirementsOnCourses.some(
                                        (roc) => roc.courseId === data.courseId
                                    )
                                )
                                .map((requirement) => ({
                                    requirement: { connect: { id: requirement.id } },
                                    status: DirectoryStatus.IN_PROGRESS,
                                })),
                        ],
                    },
                },
            });

            console.log('STUDENT: ', student)

            const group = await t.group.create({
                data: {
                    user: { connect: { id: manager.id } },
                    student: { connect: { id: student.id } },
                    groupMembers: {
                        create: [agent, manager].filter(Boolean).map((user) => ({
                            user: {
                                connect: {
                                    id: user.id,
                                    email: user.email
                                }
                            }
                        }))
                    }
                },
                include: {
                    groupMembers: {
                        include: {
                            user: true
                        }
                    },
                    student: true
                }
            });

            console.log('GROUP: ', group)
        } catch (error: any) {
            logger.error(`Error creating student: ${error.message}`);
            console.log(error.message);
        }
    });

    return { data: student, isValid: !!student };
};


const updateStudent = async (data: any
) => {
    let student;
    try{
        student  = await prisma.student.update({
            where:{
                id: data.id
            },
            data
        })
    }catch(e: any){
        console.log(e.message)
    }
        if(!student)
            logger.error('ERROR::updateStudent:Student unable to be updated')
    return {
        data: student,
        isValid: !!student
    }
};

export default {
    getAllStudentsByAgentId,
    getStudentsByOrganisationId,
    getStudentsByAgencyId,
    getStudentById,
    createStudent,
    updateStudent
}
