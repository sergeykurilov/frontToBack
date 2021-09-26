import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//Redux
import {Provider} from "react-redux"
import store from "./components/store";
import Alert from "./components/layout/alert";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar/>
                <Route exact path="/" component={Landing}/>
                <section className="container">
                    <Alert/>
                    <Switch>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </section>
            </Router>
        </Provider>
    )

}

export default App;
