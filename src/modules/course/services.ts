import prisma from "../../../prisma/prisma";

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
        isValid: !!course,
        data: course
    };
};

const createCourse = async (data: any
) => {
    const course = await prisma.course.create({
        data
    })

    return {
        isValid: !!course,
        data: course
    };
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
        isValid: !!course,
        data: course
    };
};

export default {
    getCoursesByOrgId,
    getCourseById,
    createCourse,
    updateCourse
}
