import prisma from "../../../prisma/prisma";
import {DirectoryStatus, DocStatus, StudentStatus} from "@prisma/client";

const getDirsByStudentId = async (studentId: string
) => {
    const directories = await prisma.directory.findMany({
        where: {
            studentId
        }
    })

    return {
        isValid : !!directories,
        data: directories
    };
};

const getDir = async (id: string
) => {
    let directory
    try{
        directory = await prisma.directory.findUnique({
            where: {
                id
            },
            include: {
                requirement: true,
                documents: {
                    include: {
                        messages: {
                            select: {
                               isRead: true,
                               receiverId: true,
                               senderId: true
                            }
                        }
                    }
                },
                student: true,
            }
        })
    }catch(e: any){
        console.log(e.message)
    }


    return {
        isValid: !!directory?.id,
        data: directory
    };
};

const createDir = async (studentId: string, requirementId: string
) => {
    let directory
    try{directory = await prisma.directory.create({
        data: {
            studentId,
            requirementId,
            status: DirectoryStatus.IN_PROGRESS
        }
    })}catch(e:any){console.log(e.message)}

    return {
        data: directory,
        isValid: !!directory?.id
    }
};

const updateDir = async (data: any
) => {
    let directory
    try{
        directory = await prisma.directory.update({
            where: {
                id: data.id
            },
            data
        })
    }catch(e: any){
        console.log(e.message)
    }

    return {
        data: directory,
        isValid: !!directory?.id
    }
};

const deleteDir = async (data: any) => {
    let isValid = false;
    try {
        await prisma.$transaction(async (t) => {
            const directoryToDelete = await t.directory.findUnique({
                where: { id: data.id },
                include: { requirement: {
                    select: {
                        id: true,
                        studentId: true
                    }} },
            });

            if (
                directoryToDelete?.requirement &&
                directoryToDelete?.requirement?.studentId === data.studentId
            ) {
                await t.requirement.delete({
                    where: { id: directoryToDelete.requirement.id },
                });
            }

            await t.directory.delete({
                where: { id: data.id },
            });

            const studentDirectories = await t.directory.findMany({
                where: { studentId: data.studentId },
                select: { status: true },
            });

            const allDirectoriesComplete = studentDirectories.every(
                (dir) => dir.status === DirectoryStatus.COMPLETE
            );

            if (allDirectoriesComplete) {
                await t.student.update({
                    where: { id: data.studentId },
                    data: { status: StudentStatus.ACCEPTED },
                });
            } else {
                await t.student.update({
                    where: { id: data.studentId },
                    data: { status: StudentStatus.PENDING },
                });
            }
            isValid = true
        });
    } catch (e: any) {
        console.log(e.message);
    }
    return { data: {}, isValid, message: isValid ? 'Successfully removed requirement' : 'Failed to remove requirement' };
};

export default {
    getDirsByStudentId,
    getDir,
    createDir,
    updateDir,
    deleteDir
}
