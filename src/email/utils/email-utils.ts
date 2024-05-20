import * as fs from "fs";
import emailConfig from "../config";

const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY);

interface DynamicData {
    [key: string]: string;
}

async function sendTransactionalEmail(action: string, recipientEmail: string, dynamicData: DynamicData): Promise<void> {
    const { subject, fromEmail, template } = emailConfig[action];

    const templateContent = fs.readFileSync(template, "utf8");
    const emailContent = populateTemplate(templateContent, dynamicData);

    const response = await mailchimp.messages.send({
        message: {
            from_email: fromEmail,
            subject: subject,
            html: emailContent,
            to: [
                {
                    email: recipientEmail,
                    type: "to",
                },
            ],
        },
    });

    console.log(response);
}

function populateTemplate(template: string, data: DynamicData): string {
    let populatedTemplate = template;
    for (const key in data) {
        const placeholder = `{{${key}}}`;
        const value = data[key];
        populatedTemplate = populatedTemplate.replace(placeholder, value);
    }
    return populatedTemplate;
}

export {
    sendTransactionalEmail,
    populateTemplate,
};
