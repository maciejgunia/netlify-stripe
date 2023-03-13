require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_LIVE);

const fetchProducts = async () => {
  const products = await stripe.products.list({
    limit: 100,
    active: true,
  });

  const productsWithPrices = await Promise.all(
    products.data.map(async (product, index) => {
      const prices = await stripe.prices.list({
        product: product.id,
        limit: 10,
        active: true,
      });

      return prices.data.map((price) => {
        return {
          id: product.id,
          name: product.name,
          priceId: price.id,
          price: `${price.unit_amount / 100} ${price.currency.toUpperCase()}`,
          amount: price.unit_amount,
          nickname: price.nickname,
          images: product.images,
          slug: product.name
            .replace(/\s/g, "-")
            .replace(/"/g, "")
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase(),
        };
      });
    })
  );

  let data = JSON.stringify(productsWithPrices.flat());
  fs.writeFileSync("src/data/products.json", data);
};

fetchProducts();
