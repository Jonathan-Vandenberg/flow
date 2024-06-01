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

const createStudent = async (data: any) => {
    let student;

    await prisma.$transaction(async (t) => {
        const organisation = await t.organisation.findUnique({
            where: { id: data.organisationId },
            include: {
                requirements: {
                    select: {
                        id: true,
                        details: true,
                        type: true,
                        status: true,
                        requirementsOnCourses: {
                            where: { courseId: data.courseId },
                            select: { courseId: true },
                        },
                        requirementsOnCountries: {
                            where: { country: { name: data.country } },
                            select: { countryId: true },
                        },
                    },
                },
            },
        });

        if (!organisation) {
            logger.error(`No organisation found with id ${data.organisationId}`);
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
                    ...(organisation.requirements.length > 0 && {
                        directories: {
                            create: organisation.requirements
                                .filter((requirement) => {
                                    const isCourseRequirement = requirement.requirementsOnCourses.some(
                                        (roc) => roc.courseId === data.courseId
                                    );
                                    const isCountryRequirement = requirement.requirementsOnCountries.some(
                                        (roc) => roc.countryId === data.countryId
                                    );
                                    const isGeneralRequirement =
                                        !requirement.requirementsOnCourses.length &&
                                        !requirement.requirementsOnCountries.length;
                                    return isCourseRequirement || isCountryRequirement || isGeneralRequirement;
                                })
                                .map((requirement) => ({
                                    requirement: { connect: { id: requirement.id } },
                                    status: DirectoryStatus.IN_PROGRESS,
                                })),
                        },
                    }),
                },
            });
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
    getStudentById,
    createStudent,
    updateStudent
}
