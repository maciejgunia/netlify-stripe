export const baseUrl =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8888"
        : "https://compassionate-noether-de969e.netlify.app";
export const createPaymentUrl = `${baseUrl}/.netlify/functions/create-payment`;
export const imagesUrl = process.env.NODE_ENV === "development" ? "http://localhost:8888" : "https://taku.imgix.net/";
