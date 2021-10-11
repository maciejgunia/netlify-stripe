import { FC } from "react";
import { Grid } from "../../components/Grid/Grid";
import { products } from "../../data/products";

export const Home: FC = () => {
    return (
        <div className="container">
            <Grid products={products}></Grid>
        </div>
    );
};
