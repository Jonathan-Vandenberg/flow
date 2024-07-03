import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {sendTransactionalEmail} from "../../email/utils/email-utils";
import {EmailAction} from "../../email/config";
import * as countries from "i18n-iso-countries";
import {NotificationType, Prisma, Role} from "@prisma/client";
import notificationService from "../notification/notification-service";
import NotificationService from "../notification/notification-service";
import {getAdminAndManagers} from "../user/services";

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
    const notificationService = NotificationService.getInstance();
    let agency;
    let isValid = false;

    try{
        await prisma.$transaction(async (t) => {
            let existingCountries = []
            let newCountries = []

            const organisation = await t.organisation.findUnique({
                where: {
                    id: data.organisationId
                },
                select: {
                    name: true,
                    id: true
                }
            })

            if(!organisation){
                return console.log(`No Organisation found with ID: ${data.organisationId}`)
            }

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
                    usersOnOrganisations: {
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

            const {data: adminAndManagersIds} = await getAdminAndManagers(t, organisation.id)

            await notificationService.sendNotification({
                userIds: adminAndManagersIds,
                eventType: NotificationType.AGENCY_ADDED,
                emailData: {
                    action: EmailAction.AGENCY_ADDED,
                    recipientEmail: "admin@hotclick.pro", // TODO add user emails
                    dynamicData: {
                        agencyName: data.name,
                        organisationName: organisation.name,
                        managerFirstName: manager.firstName,
                        managerLastName: manager.lastName,
                        commissionPercentage: data.commissionPercentage.toString(),
                        country: data.countries.map((c: string) => countries.getName(c, 'en') ?? '').join(', '),
                        sector: data.sector,
                    },
                },
                pushNotificationData: {
                    title: 'New Agency Created',
                    body: `A new agency "${data.name}" has been created.`,
                    data: { agencyId: agency.id },
                },
                dbNotificationData: {
                    type: NotificationType.AGENCY_ADDED,
                    data: {
                        agencyId: agency.id,
                        agencyName: data.name,
                    },
                },
                transaction: t
            });
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
