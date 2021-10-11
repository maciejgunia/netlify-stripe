import { imagesUrl } from "../environment";

export interface ProductData {
    id: string;
    name: string;
    price: string;
    priceId: string;
    image: string;
}

export const products: ProductData[] = [
    {
        id: "prod_BVH1rBtBjfrFBA",
        name: "pudełko",
        priceId: "price_1JgYYmHZVIGpqCDJi7J7HnbL",
        price: "40PLN",
        image: `${imagesUrl}/images/244973801_578001410100629_1528296092017840463_n.jpeg`
    },
    {
        id: "prod_BVH1rBtBjfrFBA1",
        name: "pudełko",
        priceId: "price_1JgYYmHZVIGpqCDJi7J7HnbL",
        price: "60PLN",
        image: `${imagesUrl}/images/242429057_1000426847417577_5358118400455359780_n.jpeg`
    },
    {
        id: "prod_BVH1rBtBjfrFBA2",
        name: "pudełko",
        priceId: "price_1JgYYmHZVIGpqCDJi7J7HnbL",
        price: "90PLN",
        image: `${imagesUrl}/images/243530389_214632550650314_9058935657259917338_n.jpeg`
    }
];
