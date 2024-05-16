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
            where: {
                id: data.organisationId
            },
            include:{
                requirements: {
                    select: {
                        id: true,
                        details: true,
                        type: true,
                        status: true
                    }
                }
            }
        });

        if (!organisation) {
            logger.error(`No organisation found with id ${data.organisationId}`);
            return;
        }

        try {
            student = await t.student.create({
                data: {
                    organisationId: data.organisationId,
                    courseId: data.courseId,
                    agentId: data.agentId,
                    agencyId: data.agencyId,
                    name: data.name,
                    age: data.age,
                    country: data.country,
                    expAttendDate: data.expAttendDate,
                    guardianMobile: data.guardianMobile,
                    guardianEmail: data.guardianEmail,
                    gapYearExplanation: data.gapYearExplanation,
                    previouslyRejected: data.previouslyRejected,
                }
            });

            if (!student) {
                logger.error('ERROR::createStudent: Student unable to be created');
                return;
            }

            if (!organisation?.requirements?.length) {
                logger.error("No requirements!");
                return;
            }

            for (const requirement of organisation.requirements) {
                await t.directory.create({
                    data: {
                        requirementId: requirement.id,
                        studentId: student.id,
                        status: DirectoryStatus.IN_PROGRESS
                    }
                });
            }
        } catch (error: any) {
            logger.error(`Error creating student: ${error.message}`);
            console.log(error.message)
        }
    });

    return {
        data: student,
        isValid: !!student
    };
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
