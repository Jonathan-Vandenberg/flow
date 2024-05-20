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

const getOrganisationById = async (id: string) => {
    let agencies;
    try {
        const organisation = await prisma.organisation.findUnique({
            where: { id },
            include: {
                users: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                students: {
                    include: { course: true },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                courses: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                requirements: {
                    include: { exampleImages: true },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                agenciesOnOrganisations: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (organisation && organisation.agenciesOnOrganisations.length) {
            const agencyIds = organisation.agenciesOnOrganisations.map(
                (agency) => agency.agencyId
            );
            agencies = await prisma.agency.findMany({
                where: { id: { in: agencyIds } },
                include: {
                    students: {
                        include: { course: true },
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                    users: true,
                    contacts: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }

        return { isValid: !!organisation, data: { ...organisation, agencies } };
    } catch (e: any) {
        console.error(e.message);
        return null;
    }
};

export default {
    createOrganisation,
    getOrganisationById
}
