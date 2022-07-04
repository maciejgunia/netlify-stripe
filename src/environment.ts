const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8888" : process.env.REACT_APP_URL;

export const createPaymentUrl = `${baseUrl}/.netlify/functions/create-payment`;
export const getProductsUrl = `${baseUrl}/.netlify/functions/products`;
