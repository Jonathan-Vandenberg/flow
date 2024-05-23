import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";

const getCoursesByOrgId = async (organisationId: string
) => {
    const courses = await prisma.course.findMany({
        where: {
            organisationId
        }
    })

    return {
        isValid: !!courses,
        data: courses
    };
};

const getCourseById = async (id: string
) => {
    const course = await prisma.course.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!course?.id,
        data: course
    };
};

const createCourse = async (data: any) => {
    let createdCourse
    try{
        createdCourse = await prisma.course.create({
            data: {
                name: data.name,
                organisation: {
                    connect: {
                        id: data.organisationId,
                    },
                },
                coursesOnLocations: {
                    connect: {
                        id: data.locationId,
                    },
                },
            }})
    } catch(e: any){
        logger.error('CREATE_COURSE::', + e.message)
    }

    return { isValid: !!createdCourse?.id, data: createdCourse };
};

const updateCourse = async (data: any
) => {
    const course = await prisma.course.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!course?.id,
        data: course
    };
};

export default {
    getCoursesByOrgId,
    getCourseById,
    createCourse,
    updateCourse
}
