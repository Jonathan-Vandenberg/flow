import prisma from "../../../prisma/prisma";
import { v4 as uuidv4 } from 'uuid';
import {logger} from "../../utils/logger";
import {DirectoryStatus} from "@prisma/client";

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
            }
        })
    }catch(e: any){
        console.log(e.message)
    }


    return {
        isValid: !!directory,
        data: directory
    };
};

const createDir = async (studentId: string, requirementId: string
) => {
    const directories = await prisma.directory.create({
        data: {
            studentId,
            requirementId,
            status: DirectoryStatus.IN_PROGRESS
        }
    })

    return {
        data: directories,
        isValid: !!directories
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
        isValid: !!directory
    }
};
export default {
    getDirsByStudentId,
    getDir,
    createDir,
    updateDir
}
