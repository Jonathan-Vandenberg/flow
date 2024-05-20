import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {sendTransactionalEmail} from "../../email";

const getAgenciesOnOrganisations = async (agencyId: string, organisationId: string
) => {
    const agenciesOnOrganisations = await prisma.agenciesOnOrganisations.findUnique({
       where: {
           agencyId_organisationId: {
               agencyId,
               organisationId
           }
       }
    })

    return {
        isValid: !!agenciesOnOrganisations,
        data: agenciesOnOrganisations
    };
};

const getAgencyById = async (id: string
) => {
    const agency = await prisma.agency.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!agency?.id,
        data: agency
    };
};

const createAgency = async (data: any
) => {
    const agency = await prisma.agency.create({
        data: {
            name: data.name,
            sector: data.sector,
            country: data.country,
            district: data.district,
            market: data.market,
            commissionPercentage: data.commissionPercentage,
            users: {
                connect: {
                    id: data.managerId
                }
            },
            agenciesOnOrganisations: {
                create: {
                    managerId: data.managerId,
                    organisationId: data.organisationId,
                }
            }
        }
    })

    if(!!agency?.id){
        await sendTransactionalEmail()
    }

    return {
        isValid: !!agency?.id,
        data: agency
    };
};

const updateAgency = async (data: any
) => {
    const agency = await prisma.agency.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!agency?.id,
        data: agency
    };
};

export default {
    getAgenciesOnOrganisations,
    getAgencyById,
    createAgency,
    updateAgency
}
