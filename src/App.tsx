import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Cancel } from "./views/Cancel/Cancel";
import { Success } from "./views/Success/Success";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

function App() {
    return (
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
        </Router>
    );
}

export default App;
