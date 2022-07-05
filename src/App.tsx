import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Cancel } from "./views/Cancel/Cancel";
import { Success } from "./views/Success/Success";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { FC, Reducer, useEffect, useReducer } from "react";
import { Cart } from "./components/Cart/Cart";
import { Product } from "./views/Product/Product";
import {
  CartAction,
  CartContext,
  CART_STORAGE_LABEL,
  initialCartValue,
  reducer,
} from "./helpers/cart";
import Terms from "./components/Terms/Terms";
import Returns from "./components/Returns/Returns";
import Privacy from "./components/Privacy/Privacy";
import Contact from "./components/Contact/Contact";

export const App: FC = () => {
  const [cartState, dispatch] = useReducer<Reducer<string[], CartAction>>(
    reducer,
    initialCartValue
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_LABEL, JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider value={{ state: cartState, dispatch }}>
      <Router>
        <div id="content">
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/product/:slug">
              <Product></Product>
            </Route>
            <Route path="/success">
              <Success></Success>
            </Route>
            <Route path="/cancel">
              <Cancel></Cancel>
            </Route>
            <Route path="/regulamin">
              <Terms></Terms>
            </Route>
            <Route path="/zwroty">
              <Returns></Returns>
            </Route>
            <Route path="/prywatnosc">
              <Privacy></Privacy>
            </Route>
            <Route path="/kontakt">
              <Contact></Contact>
            </Route>
            <Route path="404" render={() => <>Not found</>} />
            <Route path="*" render={() => <>Not found</>} />
          </Switch>
        </div>
        <Footer></Footer>
        <Cart></Cart>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
