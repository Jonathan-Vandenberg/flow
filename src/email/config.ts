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
    AGENCY_ADDED = 'agencyAdded',
    MANAGER_ADDED = 'managerAdded'
}

const emailConfig: EmailConfig = {
    agencyAdded: {
        subject: "New Agency Created",
        fromEmail: "info@hotclick.pro",
        template: path.join(__dirname, "../email/templates/agency-added.html"),
    },
    managerAdded: {
        subject: "New Manager Added",
        fromEmail: "info@hotclick.pro",
        template: path.join(__dirname, "../templates/managerAddedTemplate.html"),
    },
};

export default emailConfig;
