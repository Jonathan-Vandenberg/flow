import prisma from "../../../prisma/prisma";
import {logger} from "../../utils/logger";
import {Contact} from "@prisma/client";

const getContactsByAgencyId = async (agencyId: string
) => {
    const contacts = await prisma.contact.findMany({
        where: {
            agencyId
        }
    })

    return {
        isValid: !!contacts,
        data: contacts
    };
};

const getContactById = async (id: string
) => {
    const contact = await prisma.contact.findUnique({
        where: {
            id
        }
    })

    return {
        isValid: !!contact?.id,
        data: contact
    };
};

const createContact = async (data: any
) => {
    const contact = await prisma.contact.create({
        data
    })

    return {
        isValid: !!contact?.id,
        data: contact
    };
};

const updateContact = async (data: any
) => {
    const contact = await prisma.contact.update({
        where: {
            id: data.id,
        },
        data
    })

    return {
        isValid: !!contact?.id,
        data: contact
    };
};

export default {
    getContactsByAgencyId,
    getContactById,
    createContact,
    updateContact
}
