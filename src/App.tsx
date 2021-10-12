import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Cancel } from "./views/Cancel/Cancel";
import { Success } from "./views/Success/Success";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import "./global.css";

function App() {
    return (
        <Router>
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
            <Footer></Footer>
        </Router>
    );
}

export default App;
