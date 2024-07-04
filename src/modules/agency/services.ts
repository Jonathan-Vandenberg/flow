import prisma from "../../../prisma/prisma";
import {EmailAction} from "../../email/config";
import * as countries from "i18n-iso-countries";
import {Agency, NotificationType, Prisma, Role} from "@prisma/client";
import NotificationService from "../notification/notification-service";
import {getUsersIds} from "../user/services";

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

            const {data: userIds} = await getUsersIds({t, organisationId: organisation.id, managers: true, admins: true})

            await notificationService.sendNotification({
                userIds: userIds,
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
    let agency: Agency | null = null;
    let isValid = false;
    let existingCountries = []
    let newCountries = []
    const notificationService = NotificationService.getInstance();

    try{
        await prisma.$transaction(async (t) => {
            const organisation = await t.organisation.findUnique({
                where: {
                    id: data.organisationId
                },
                select: {
                    name: true
                }
            })

            if(!organisation){
                return console.log(`No Organisation found with ID: ${data.organisationId}`)
            }

            const existingRelations = await t.agenciesOnCountries.findMany({
                where: { agencyId: data.id },
                include: { country: true }
            });
            const existingCountryNames = new Set(existingRelations.map(r => r.country.name));

            const countryOperations = await Promise.all(data.countries.map(async (countryName: string) => {
                if (!existingCountryNames.has(countryName)) {
                    const country = await t.country.upsert({
                        where: { name: countryName },
                        create: { name: countryName },
                        update: {},
                    });
                    return { create: { countryId: country.id } };
                }
                return null; // Skip if relation already exists
            }));

            agency = await t.agency.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                    sector: data.sector,
                    agenciesOnCountries: {
                        create: countryOperations.filter(op => op !== null) as any,
                    },
                    commissionPercentage: data.commissionPercentage,
                }
            })

            const {data: userIds} = await getUsersIds({t, organisationId: data.organisationId, admins: true})

            await notificationService.sendNotification({
                userIds: userIds,
                eventType: NotificationType.AGENCY_UPDATED,
                pushNotificationData: {
                    title: 'Agency Updated',
                    body: `The agency, "${agency.name}", has been updated.`,
                    data: { agencyId: agency.id },
                },
                dbNotificationData: {
                    type: NotificationType.AGENCY_UPDATED,
                    data: {
                        agencyId: agency.id,
                        agencyName: data.name,
                    },
                },
                transaction: t
            });

        })
    } catch(e: any){console.log('ERROR::updateAgency: ', e.message)}

    return { isValid: isValid, data: agency };
};

export default {
    getAgenciesOnOrganisations,
    getAgencyById,
    createAgency,
    updateAgency
}
