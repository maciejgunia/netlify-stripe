import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Cancel } from "./views/Cancel/Cancel";
import { Success } from "./views/Success/Success";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import React, { FC, useReducer } from "react";
import { Cart } from "./components/Cart/Cart";
import { ProductData, products } from "./data/products";

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

export const ProductContext = React.createContext<ProductData[]>(products);

export const App: FC = () => {
    const [state, dispatch] = useReducer(reducer, []);

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
