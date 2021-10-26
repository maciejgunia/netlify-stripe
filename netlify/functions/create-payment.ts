import { baseUrl } from "../../src/environment";
import { Handler } from "@netlify/functions";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

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
    let session;

    try {
        items = JSON.parse(event.body).items;
        session = await stripe.checkout.sessions.create({
            line_items: items.map((item) => ({
                price: item.priceId,
                quantity: 1
            })),
            shipping_rates: ["shr_1JgUVJHZVIGpqCDJVpsyQ5Cr"],
            payment_method_types: ["card", "p24"],
            shipping_address_collection: {
                allowed_countries: ["PL"]
            },
            mode: "payment",
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancel`
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
