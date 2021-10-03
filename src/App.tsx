import "./App.css";
import { Product } from "./components/Product";
import { products } from "./data/products.json";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    console.log(products);
    return (
        <Router>
            <Switch>
                <Route path="/success">SUCCESS</Route>
                <Route path="/cancel">CANCEL</Route>
                <Route path="/">
                    HOME
                    {products.map((product) => (
                        <Product key={product.id} data={product}></Product>
                    ))}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
