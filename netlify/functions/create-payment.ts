import { baseUrl } from "../../src/environment";
import { Handler } from "@netlify/functions";

const context = process.env.CONTEXT;
let stripe;

if (context === "production") {
    stripe = require("stripe")(process.env.STRIPE_SECRET);
} else {
    stripe = require("stripe")(process.env.STRIPE_SECRET_STAGING);
}

export const handler: Handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": "application/json"
            }
        };
    }

    let items: { priceId: string }[];
    let deliveryPoint: string;
    let session;

    try {
        items = JSON.parse(event.body).items;
        deliveryPoint = JSON.parse(event.body).deliveryPoint;
        session = await stripe.checkout.sessions.create({
            line_items: items.map((item) => ({
                price: item.priceId,
                quantity: 1
            })),
            shipping_rates: ["shr_1JgUVJHZVIGpqCDJVpsyQ5Cr"],
            payment_method_types: ["card", "p24"],
            phone_number_collection: {
                enabled: true
            },
            mode: "payment",
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancel`,
            payment_intent_data: {
                metadata: { paczkomat: deliveryPoint }
            }
        });
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: e })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ redirect: session.url })
    };
};
