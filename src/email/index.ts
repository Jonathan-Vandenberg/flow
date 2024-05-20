const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function sendTransactionalEmail() {
    const response = await mailchimp.messages.send({
        message: {
            from_email: "info@hotclick.pro",
            subject: "Subject of the email",
            text: "Plain text content of the email",
            to: [
                {
                    email: "urbangentryjon@gmail.com",
                    type: "to",
                },
            ],
        },
    });

    console.log(response);
}
