import { Handler } from "@netlify/functions";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const handler: Handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
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
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`
        });
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: e }),
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ redirect: session.url }),
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        }
    };
};

export { handler };
