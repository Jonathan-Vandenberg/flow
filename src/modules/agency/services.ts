import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {sendTransactionalEmail} from "../../email/utils/email-utils";
import {EmailAction} from "../../email/config";
import * as countries from "i18n-iso-countries";
import {Role} from "@prisma/client";

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

const createAgency = async (data: any) => {
    let agency;
    let isValid = false;

    try{
        await prisma.$transaction(async (t) => {
            let existingCountries = []
            let newCountries = []

            for (const countryName of data.countries) {
                const country = await prisma.country.findUnique({
                    where: { name: countryName },
                });

                if (country) {
                    existingCountries.push(country);
                } else {
                    const newCountry = await t.country.create({
                        data: {
                            name: countryName,
                        },
                    });
                    newCountries.push(newCountry);
                }
            }

            const manager = await t.user.findUnique({
                where: { id: data.managerId },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    agenciesOnOrganisations: {
                        where: { organisationId: data.organisationId },
                        select: { organisation: { select: { name: true } } },
                    },
                },
            });

            if(!manager){
                return Error('No manager found!')
            }

            agency = await t.agency.create({
                data: {
                    name: data.name,
                    sector: data.sector,
                    district: data.district,
                    market: data.market,
                    commissionPercentage: data.commissionPercentage,
                    agenciesOnCountries: {
                        create: [
                            ...existingCountries.map((country) => ({
                                country: { connect: { id: country.id } },
                            })),
                            ...newCountries.map((country) => ({
                                country: { connect: { id: country.id } },
                            })),
                        ],
                    },
                    usersOnAgencies: {
                        create: {
                            userId: data.managerId,
                            role: Role.MANAGER,
                            email: manager?.email,
                        },
                    },
                    agenciesOnOrganisations: {
                        create: {
                            managerId: data.managerId,
                            organisationId: data.organisationId,
                        },
                    },
                    contacts: {
                        create: data.contacts.map((contact: any) => ({
                            name: contact.name,
                            email: contact.email,
                            mobile: contact.mobile,
                            title: contact.title,
                        })),
                    },
                },
            });

            if (agency?.id && manager && manager.agenciesOnOrganisations.length) {
                isValid = true;
                await sendTransactionalEmail({
                    action: EmailAction.AGENCY_CREATED,
                    recipientEmail: "admin@hotclick.pro",
                    dynamicData: {
                        agencyName: data.name,
                        organisationName: manager.agenciesOnOrganisations[0].organisation?.name || '',
                        managerFirstName: manager.firstName,
                        managerLastName: manager.lastName,
                        commissionPercentage: data.commissionPercentage,
                        country: data.countries.map((c: string) => countries.getName(c, 'en') ?? ''),
                        sector: data.sector,
                    },
                });
            }
        });
    } catch(e: any) {
        console.log(e.message)
    }

    return { isValid: isValid, data: agency };
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
