import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Cancel } from "./views/Cancel/Cancel";
import { Success } from "./views/Success/Success";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import React, { FC, useEffect, useReducer, useState } from "react";
import { Cart } from "./components/Cart/Cart";
import { getProductsUrl } from "./environment";

export interface ProductData {
    id: string;
    name: string;
    price: string;
    priceId: string;
    images: string[];
}

export enum CartActionType {
    Add = "add",
    Remove = "remove"
}

type CartAction = {
    type: CartActionType;
    id: string;
};

const reducer = (state: string[], { type, id }: CartAction) => {
    switch (type) {
        case CartActionType.Add:
            return Array.from(new Set([...state, id]));
        case CartActionType.Remove:
            return state.filter((item) => item !== id);
        default:
            throw new Error();
    }
};

export const CartContext = React.createContext<{ state: string[]; dispatch: (action: CartAction) => void }>({
    state: [],
    dispatch: () => {}
});

export const ProductContext = React.createContext<ProductData[]>([]);

export const App: FC = () => {
    const [state, dispatch] = useReducer(reducer, []);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(getProductsUrl)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(`Request failed with status ${res.status}`);
                }

                return res.json();
            })
            .then((products) => {
                setProducts(products);
            })
            .catch((e) => console.error(e));
    }, []);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            <ProductContext.Provider value={products}>
                <Router>
                    <div id="content">
                        <Header></Header>
                        <Switch>
                            <Route path="/success">
                                <Success></Success>
                            </Route>
                            <Route path="/cancel">
                                <Cancel></Cancel>
                            </Route>
                            <Route path="/">
                                <Home></Home>
                            </Route>
                        </Switch>
                    </div>
                    <Footer></Footer>
                    <Cart></Cart>
                </Router>
            </ProductContext.Provider>
        </CartContext.Provider>
    );
};

export default App;
