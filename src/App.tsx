import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Cancel } from "./views/Cancel/Cancel";
import { Success } from "./views/Success/Success";
import "./App.scss";
import { Footer } from "./components/Footer/Footer";

function App() {
    return (
        <>
            <Router>
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
            </Router>
            <Footer></Footer>
        </>
    );
}

export default App;
