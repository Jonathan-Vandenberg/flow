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
    let agencies
    try {
        const organisation = await prisma.organisation.findUnique({
            where: {
                id
            },
            include: {
                users: true,
                students: true,
                courses: true,
                requirements: true,
                agenciesOnOrganisations: true
            }
        });

        if (organisation && organisation.agenciesOnOrganisations.length) {
            const agencyIds = organisation.agenciesOnOrganisations.map((agency) => agency.agencyId);
            agencies = await prisma.agency.findMany({
                where: {
                    id: { in: agencyIds }
                },
                include: {
                    students: true,
                    users: true,
                    contacts: true
                }
            });
        }

        return {
            isValid: !!organisation,
            data: {...organisation, agencies}
        };
    } catch (e: any) {
        console.error(e.message);
        return null;
    }
};

export default {
    createOrganisation,
    getOrganisationById
}
