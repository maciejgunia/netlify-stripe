import { Handler } from "@netlify/functions";

const context = process.env.CONTEXT;
let stripe;

console.log(process.env);

if (context === "production") {
    stripe = require("stripe")(process.env.STRIPE_SECRET);
} else {
    stripe = require("stripe")(process.env.STRIPE_SECRET_STAGING);
}

const delay = async (index) => {
    return new Promise<void>((resolve) =>
        setTimeout(
            () => {
                resolve();
            },
            context === "production" ? 0 : 10 * index
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
