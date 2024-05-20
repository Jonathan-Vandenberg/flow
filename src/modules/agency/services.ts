import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {sendTransactionalEmail} from "../../email/utils/email-utils";
import {EmailAction} from "../../email/config";
import * as countries from "i18n-iso-countries";

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
    let agency;
    let isValid = false;

    await prisma.$transaction(async (t) => {
        const manager = await t.user.findUnique({
            where: {
                id: data.managerId
            },
            select: {
                firstName: true,
                lastName: true,
                organisation: {
                    select: {
                        name: true
                    }
                }
            }
        })

         agency = await t.agency.create({
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

        if(!!agency?.id && manager && manager.organisation){
            isValid = true
            await sendTransactionalEmail({
                action: EmailAction.AGENCY_CREATED,
                recipientEmail: "admin@hotclick.pro", // TODO Replace with recipient address/es (Admin)
                dynamicData: {
                    agencyName: data.name,
                    organisationName: manager.organisation.name,
                    managerFirstName: manager.firstName,
                    managerLastName: manager.lastName,
                    commissionPercentage: data.commissionPercentage,
                    country: countries.getName(data.country, 'en') ?? '',
                    sector: data.sector
                }
            });
        }
    })

    return {
        isValid: isValid,
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
