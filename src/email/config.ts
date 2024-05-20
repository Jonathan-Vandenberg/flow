import * as path from "path";

interface EmailTemplate {
    subject: string;
    fromEmail: string;
    template: string;
}

interface EmailConfig {
    [key: string]: EmailTemplate;
}

const emailConfig: EmailConfig = {
    agencyCreated: {
        subject: "New Agency Created",
        fromEmail: "info@hotclick.pro",
        template: path.join(__dirname, "../templates/agencyCreatedTemplate.html"),
    },
    managerAdded: {
        subject: "New Manager Added",
        fromEmail: "info@hotclick.pro",
        template: path.join(__dirname, "../templates/managerAddedTemplate.html"),
    },
    // Add more actions and their corresponding configurations
};

export default emailConfig;
