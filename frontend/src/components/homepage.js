import React, {Component} from "react";
import BreakfastMenu from './breakfast'
import LunchMenu from './lunch'
import DinnerMenu from './dinner'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import CreateMenuItemPage from "./create_menuitem_page";
import Header from './header';
import Footer from './footer';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        }
    render() {
        return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/"><h1>This is the home page</h1></Route>
                <Route path="/breakfast" component={BreakfastMenu}></Route>
                <Route path="/lunch" component={LunchMenu}></Route>
                <Route path="/dinner" component={DinnerMenu}></Route>
                <Route path="/create" component={CreateMenuItemPage}></Route>
            </Switch>
            <Footer/>
        </Router>
        );
    }
}