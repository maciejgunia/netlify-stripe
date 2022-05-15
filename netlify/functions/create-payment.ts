import { Handler } from "@netlify/functions";

const isDev = process.env.CONTEXT === "dev";
const baseUrl = process.env.URL;
let stripe;
let shipping;

if (isDev) {
    stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
    shipping = "shr_1KLXtzKDt2gO4ctBjcbALgaw";
} else {
    stripe = require("stripe")(process.env.STRIPE_SECRET_LIVE);
    shipping = "shr_1Kw7X4KDt2gO4ctBKsWO8QyO";
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
    let phone: string;
    let session;

    try {
        items = JSON.parse(event.body).items;
        deliveryPoint = JSON.parse(event.body).deliveryPoint;
        phone = JSON.parse(event.body).phone;
        session = await stripe.checkout.sessions.create({
            line_items: items.map((item) => ({
                price: item.priceId,
                quantity: 1
            })),
            shipping_rates: [shipping],
            payment_method_types: ["card", "p24"],
            // payment_method_types: ["card"],
            mode: "payment",
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancel`,
            payment_intent_data: {
                metadata: { paczkomat: deliveryPoint, telefon: phone }
            }
        });
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: e.message })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ redirect: session.url })
    };
};
