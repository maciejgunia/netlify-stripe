console.log(process.env);
export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8888" : process.env.DEPLOY_URL;
export const createPaymentUrl = `${baseUrl}/.netlify/functions/create-payment`;
export const getProductsUrl = `${baseUrl}/.netlify/functions/products`;
export const imagesUrl = process.env.NODE_ENV === "development" ? "http://localhost:8888" : "https://taku.imgix.net";
