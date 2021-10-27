import { Handler } from "@netlify/functions";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const handler: Handler = async () => {
    let products;
    let prices;
    let productsWithPrices = [];

    try {
        products = await stripe.products.list({
            limit: 3
        });

        prices = await stripe.prices.list({
            limit: 3
        });

        prices.data.forEach((price) => {
            const product = products.data.find((product) => product.id === price.product);

            if (typeof product === "undefined") {
                return;
            }

            productsWithPrices.push({
                id: product.id,
                name: product.name,
                priceId: price.id,
                price: `${price.unit_amount / 100} ${price.currency.toUpperCase()}`,
                nickname: price.nickname,
                images: product.images,
                slug: product.name
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")
                    .toLowerCase()
            });
        });
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: e })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(productsWithPrices)
    };
};
