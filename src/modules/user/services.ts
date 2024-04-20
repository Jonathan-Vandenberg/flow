// import prisma from '../../../prisma/prisma';
// import {Role} from "@prisma/client";
// import {logger} from "../../utils/logger";
//
// //Check alias already exists
// const checkUserAlias = async (
//     alias: string
// ): Promise<{ isValid: boolean; message: string }> => {
//     const user = await prisma.user.findUnique({
//         where: { alias }
//     });
//
//     return {
//         isValid: !!user,
//         message: user ? 'Alias already exists' : 'Alias is valid.'
//     };
// };
//
// const getUserById = async (
//     userId: string
// ): Promise<{ isValid: boolean; message: string }> => {
//     console.log('USER ID', userId)
//     let user
//
//     try {
//         user = await prisma.user.findUnique({
//                 where: { id: userId }
//         })
//     } catch(e: any){
//         console.log('ERRER: ', e)
//         logger.error(`ERROR::getUserById::${e.message}`)
//     }
//
//     return {
//         isValid: !!user,
//         message: user ? 'Alias already exists' : 'Alias is valid.'
//     };
// };
//
// const createUser = async (
//     name: string,
//     role: string
// ): Promise<{ isValid: boolean; message: string }> => {
//
//     console.log('DATA: ', name, role)
//     const user = await prisma.user.create({
//         data: {
//             name,
//             role: role as Role
//         }
//     });
//
//     return {
//         isValid: !!user,
//         message: user ? 'Alias already exists' : 'Alias is valid.'
//     };
// };
//
// export default {
//     checkUserAlias,
//     getUserById,
//     createUser
// };
