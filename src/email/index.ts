const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY);

export async function sendTransactionalEmail() {
    const response = await mailchimp.messages.send({
        message: {
            from_email: "info@hotclick.pro",
            subject: "Subject of the email",
            text: "Plain text content of the email",
            to: [
                {
                    email: "admin@hotclick.pro",
                    type: "to",
                },
            ],
        },
    });

    console.log(response);
}
