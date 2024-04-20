import {PrismaClient} from "prisma/prisma-client/scripts/default-index";

const searchForJon = async (prisma: PrismaClient) =>  {
        const now = Math.round(Date.now() / 1000);

        return prisma.user.find({
            where: {
                name: 'jon'
            }
        });
}

export default {
    searchForJon
}
