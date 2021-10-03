import { Handler } from "@netlify/functions";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const handler: Handler = async (event) => {
    console.log(event);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: "price_1JgF8pHZVIGpqCDJKdqPh7r4",
                quantity: 1
            }
        ],
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" }),
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000"
        }
    };
};

export { handler };
