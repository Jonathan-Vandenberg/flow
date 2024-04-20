import {PrismaClient} from '@prisma/client';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import morgan from 'morgan';
import cron from 'node-cron';
import userJobs from "./jobs/scanner";
import {logger} from "./utils/logger";
import organisation from '../src/modules/organisation/routes'
import manager from './modules/manager/routes'
import agent from './modules/agent/routes'
import student from './modules/student/routes'
import directory from './modules/directory/routes'
import document from './modules/document/routes'
import requirement from './modules/requirement/routes'
import course from './modules/course/routes'
import {ENV_DEPLOYED} from "./constants/environment";

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;
const app = express().set('port', PORT);

app.use(morgan('combined'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', `${process.env.CORS}` ?? '*');
    next();
});
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/organisation', organisation);
app.use('/manager', manager);
app.use('/agent', agent);
app.use('/student', student);
app.use('/directory', directory);
app.use('/document', document)
app.use('/requirement', requirement)
app.use('/course', course)

app.get('/', function (req, res) {
    res.send('Backend API service is running!');
});
app.listen(app.get('port'), async function () {
    logger.info(`Backend is running on port ${app.get('port')}`)

});

if (
    [ENV_DEPLOYED.PROD, ENV_DEPLOYED.DEV]
        .includes(process.env.ENV_DEPLOYED ?? ENV_DEPLOYED.LOCAL)
) {
    setTimeout(() => {
        cron.schedule('* * * * * *', () => userJobs.searchForJon(prisma), {
            name: 'scanner-task'
        });
        logger.info('Jon finder searching')
    }, 5000);
}
