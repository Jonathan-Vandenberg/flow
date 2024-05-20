import prisma from "../../../prisma/prisma";

const getDocsByDirectoryId = async (directoryId: string
) => {
    const documents = await prisma.document.findMany({
        where: {
            directoryId
        }
    })

    return {
        isValid : !!documents,
        data: documents
    };
};

const getDoc = async (id: string
) => {
    const document = await prisma.document.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!document,
        data: document
    };
};

const createDoc = async (data: any
) => {
    let document
    try {
        document = await prisma.document.create({
            data
        })
    } catch (e: any) {console.log(e.message)}

    return {
        data: document,
        isValid: !!document
    }
};

const updateDoc = async (data: any
) => {
    const document = await prisma.document.update({
        where: {
            id: data.id
        },
        data
    })

    return {
        data: document,
        isValid: !!document
    }
};

export default {
    getDocsByDirectoryId,
    getDoc,
    createDoc,
    updateDoc

}
