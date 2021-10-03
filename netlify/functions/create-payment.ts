import { Handler } from "@netlify/functions";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
import { baseUrl } from "../../src/environment";

const handler: Handler = async (event) => {
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

    let price: string;
    let session;

    try {
        price = JSON.parse(event.body).items[0].price;
        session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price,
                    quantity: 1
                }
            ],
            shipping_rates: ["shr_1JgUVJHZVIGpqCDJVpsyQ5Cr"],
            payment_method_types: ["card"],
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

export { handler };
