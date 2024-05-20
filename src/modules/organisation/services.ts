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
                        createdAt: 'asc',
                    },
                },
                students: {
                    include: { course: true },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                courses: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                requirements: {
                    include: { exampleImages: true },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                agenciesOnOrganisations: {
                    orderBy: {
                        createdAt: 'asc',
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
                            createdAt: 'asc',
                        },
                    },
                    users: {
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                    contacts: {
                        orderBy: {
                            createdAt: 'asc',
                        },
                    },
                },
                orderBy: {
                    createdAt: 'asc',
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
