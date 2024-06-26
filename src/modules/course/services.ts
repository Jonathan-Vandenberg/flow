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
                ...(data.locationIds && data.locationIds.length > 0 && {
                    coursesOnLocations: {
                        create: data.locationIds.map((locationId: string) => ({
                            location: {
                                connect: {
                                    id: locationId,
                                },
                            },
                        })),
                    },
                }),
            },
        });
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

const deleteCourse = async (data: any) => {
    const course = await prisma.course.delete({
        where: {
            id: data.id,
        },
        include: {
            students: true,
        },
    });

    if (course?.students.length > 0) {
        await prisma.student.updateMany({
            where: {
                courseId: data.id,
            },
            data: {
                courseId: null,
            },
        });
    }

    return { isValid: !!course?.id, data: course };
};

export default {
    getCoursesByOrgId,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}
