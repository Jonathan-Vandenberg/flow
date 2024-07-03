import * as path from "path";

interface EmailTemplate {
    subject: string;
    fromEmail: string;
    template: string;
}

interface EmailConfig {
    [key: string]: EmailTemplate;
}

export enum EmailAction {
    AGENCY_CREATED = 'agencyCreated',
    MANAGER_ADDED = 'managerAdded'
}

const emailConfig: EmailConfig = {
    agencyCreated: {
        subject: "New Agency Created",
        fromEmail: "info@hotclick.pro",
        template: path.join(__dirname, "../email/templates/agency-created.html"),
    },
    managerAdded: {
        subject: "New Manager Added",
        fromEmail: "info@hotclick.pro",
        template: path.join(__dirname, "../templates/managerAddedTemplate.html"),
    },
};

export default emailConfig;
