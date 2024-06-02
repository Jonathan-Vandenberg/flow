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

const createDoc = async (data: any) => {
    let document;

    try {
        document = await prisma.document.create({
            data: {
                directory: {
                    connect: {
                        id: data.directoryId,
                    },
                },
                url: data.url,
                name: data.name,
                description: data.description,
            },
            include: {
                directory: true,
                task: true,
            },
        });
    } catch (e: any) {
        console.log(e.message);
    }

    return {
        data: document,
        isValid: !!document?.id,
    };
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
