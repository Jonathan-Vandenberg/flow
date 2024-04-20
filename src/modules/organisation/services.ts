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

export default {
    createOrganisation
}
