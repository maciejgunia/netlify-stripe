import { Handler } from "@netlify/functions";

const isDev = process.env.CONTEXT === "dev";
let stripe;

if (!isDev) {
    stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
} else {
    stripe = require("stripe")(process.env.STRIPE_SECRET_LIVE);
}

const delay = async (index) => {
    return new Promise<void>((resolve) =>
        setTimeout(
            () => {
                resolve();
            },
            isDev ? 10 * index : 0
        )
    );
};

export const handler: Handler = async () => {
    let productsWithPrices = [];

    try {
        const products = await stripe.products.list({
            limit: 100
        });

        productsWithPrices = await Promise.all(
            products.data.map(async (product, index) => {
                await delay(index);
                const prices = await stripe.prices.list({
                    product: product.id,
                    limit: 10
                });

                return prices.data.map((price) => {
                    return {
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
                    };
                });
            })
        );
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: e })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(productsWithPrices.flat())
    };
};
