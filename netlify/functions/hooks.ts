import { Handler } from "@netlify/functions";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const handler: Handler = async (event) => {
    console.log(event);
    // // Check if webhook signing is configured.
    // if (process.env.STRIPE_SECRET) {
    //     // Retrieve the event by verifying the signature using the raw body and secret.
    //     let event;
    //     let signature = event.headers["stripe-signature"];

    //     try {
    //         event = stripe.webhooks.constructEvent(event.rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    //     } catch (err) {
    //         console.log(`⚠️  Webhook signature verification failed.`);
    //         return {
    //             statusCode: 400
    //         };
    //     }
    //     // Extract the object from the event.
    //     data = event.data;
    //     eventType = event.type;
    // } else {
    //     // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    //     // retrieve the event data directly from the request body.
    //     data = req.body.data;
    //     eventType = req.body.type;
    // }

    // if (eventType === "checkout.session.completed") {
    //     console.log(`🔔  Payment received!`);
    // }

    // res.sendStatus(200);

    return { statusCode: 200, body: JSON.stringify({ message: "hooks" }) };
};

export { handler };
