// import { Role } from '@prisma/client';
// import { NextFunction, Request, Response } from 'express';
// import { validationResult } from 'express-validator';
// import jwt from 'jsonwebtoken';
// import prisma from '../../prisma/prisma';
// import {logger}  from '../utils/logger';
//
// /**
//  * @method generateAccessToken
//  *
//  * This method helps generate an authentication token when a users is successfully authenticated.
//  *
//  * @param userId as the ID of the users being authenticated.
//  *
//  * @returns authToken as the authentication token, that can be used for further requests.
//  */
// export const generateAccessToken = (userId: any) => {
//     return jwt.sign(
//         { userId },
//         process.env.TOKEN_SECRET ? (process.env.TOKEN_SECRET as string) : '',
//         {
//             expiresIn: process.env.TOKEN_EXPIRATION_TIME as string
//         }
//     );
// };
//
// export const getExpirationTime = (token: string): Date | null => {
//     try {
//         const decodedToken: any = jwt.decode(token);
//         if (decodedToken && typeof decodedToken.exp === 'number') {
//             return decodedToken.exp;
//         }
//         return null;
//     } catch (error) {
//         logger.error('Error decoding JWT token:', error);
//         return null;
//     }
// };
//
// /**
//  * @middleware authenticateToken
//  *
//  * This middleware function helps check if the users is authenticated based on the headers,
//  * and if they hold a valid authentication token.
//  */
// export function isAuthenticated(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     const token = req.headers['authorization'];
//     if (!token) {
//         res.status(401).send('Token is empty!');
//         return;
//     } else {
//         try {
//             const recoveredUser: any = jwt.verify(
//                 token,
//                 process.env.TOKEN_SECRET ?? ''
//             );
//
//             if (recoveredUser?.id === undefined) {
//                 res.status(401).send('Authorization is invalid!');
//                 return;
//             } else {
//                 req.body.authenticateId = recoveredUser.id;
//                 next();
//             }
//         } catch (err: any) {
//             if (
//                 err.message === 'invalid signature' ||
//                 err.message === 'jwt expired'
//             ) {
//                 res.status(401).send('Signature is not valid!');
//                 return;
//             } else {
//                 res.status(500).send('Unexpected error!' + err.message);
//                 return;
//             }
//         }
//     }
// }
//
// const isUserRole = async (id: string, role: Role) => {
//     const user = await prisma.user.findFirst({
//         where: {
//             id,
//             role
//         }
//     });
//     return !!user;
// };
//
// /**
//  * @middleware isAuthenticatedWithRoles
//  *
//  * This middleware function helps check if the users is authenticated based on the headers,
//  * and if they hold a valid authentication token for a specific users role or roles.
//  */
// export function isAuthenticatedWithRoles(role: Role) {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         await isAuthenticated(req, res, async () => {
//             if (await isUserRole(req.body.authenticatedId, role)) next();
//             else {
//                 res.status(403).send('User must have devops role!');
//                 return;
//             }
//         });
//     };
// }
//
// /**
//  * @middleware isValidationResult
//  *
//  * This middleware function helps check if the request is valid based on the headers.
//  */
// export async function isValidationResult(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     const errors: any = validationResult(req);
//     if (!errors.isEmpty()) {
//         logger.error(errors);
//         return res.status(400).send(errors?.errors[0]?.msg);
//     }
//
//     next();
// }
