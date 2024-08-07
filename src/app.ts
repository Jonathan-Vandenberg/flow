import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cron from 'node-cron';
import { logger } from "./utils/logger";
import organisation from '../src/modules/organisation/routes';
import user from './modules/user/routes';
import agency from './modules/agency/routes';
import contact from './modules/contact/routes';
import student from './modules/student/routes';
import directory from './modules/directory/routes';
import document from './modules/document/routes';
import notification from './modules/notification/routes';
import userJobs from '../src/jobs/scanner';
import requirement from './modules/requirement/routes';
import course from './modules/course/routes';
import message from './modules/message/routes';
import { ENV_DEPLOYED } from "./constants/environment";
import * as http from "http";
import { Server } from "socket.io";
import * as admin from 'firebase-admin';
import * as path from 'path';
import { ServiceAccount } from "firebase-admin";
import { setupSocketIO } from "./websocket/websocket";
import NotificationService from "./modules/notification/notification-service";

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;
const app = express().set('port', PORT);
const server = http.createServer(app);

const serviceAccountPath = path.join('/home/user/Downloads/service-account-firebase.json');
const serviceAccount = require(serviceAccountPath) as ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const io = new Server(server, {
    cors: {
        origin: process.env.CORS || '*',
        methods: ['GET', 'POST']
    }
});

setupSocketIO(io);

NotificationService.getInstance(io);

app.use(morgan('combined'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', `${process.env.CORS}` ?? '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', user);
app.use('/organisation', organisation);
app.use('/agency', agency);
app.use('/contact', contact);
app.use('/student', student);
app.use('/directory', directory);
app.use('/document', document);
app.use('/requirement', requirement);
app.use('/course', course);
app.use('/message', message);
app.use('/notification', notification);

app.get('/', function (req, res) {
    res.send('Backend API service is running!');
});

server.listen(app.get('port'), async function () {
    logger.info(`Backend is running on port ${app.get('port')}`);
});

if (
    [ENV_DEPLOYED.PROD, ENV_DEPLOYED.DEV]
        .includes(process.env.ENV_DEPLOYED ?? ENV_DEPLOYED.LOCAL)
) {
    setTimeout(() => {
        cron.schedule('* * *', () => userJobs.searchForJon(prisma), { name: 'scanner-task' });
        logger.info('Jon finder searching');
    }, 5000);
}
