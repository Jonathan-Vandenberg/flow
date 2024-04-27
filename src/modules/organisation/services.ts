import prisma from "../../../prisma/prisma";

const createOrganisation = async (data: any
) => {
    let organisation
    try{
        organisation = await prisma.organisation.create({
            data
        })

    } catch(e: any) {
        console.log(e.message)
    }

    return {
        isValid: !!organisation,
        data: organisation
    };
};

const getOrganisationById = async (id: string
) => {
    let organisation
    try{
        organisation = await prisma.organisation.findUnique({
            where: {
                id
            },
            include: {
                students: true,
                managers: {
                    include: {
                        managedAgencies: {
                            include: {
                                agents: true
                            }
                        }
                    }
                },
                courses: true,
                requirements: true
            }
        })

    } catch(e: any) {
        console.log(e.message)
    }

    return {
        isValid: !!organisation,
        data: organisation
    };
};

export default {
    createOrganisation,
    getOrganisationById
}
