import React, {Component} from "react";
import BreakfastMenu from './breakfast'
import LunchMenu from './lunch'
import DinnerMenu from './dinner'
import Orders from './mealorders'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import CreateMenuItemPage from "./create_menuitem_page";
import Header from './header';
import Footer from './footer';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.all_orders = Array;
        }
    componentDidMount() {
        // this fetches the Api data
        // put a function like this on each page
        // one to show all orders
        // then on specific meal pages, to fetch the relevant menuitems
        console.log("homepage mounted")
        const apiUrl = `http://127.0.0.1:8000/main/mealorders`
        fetch(apiUrl)
        .then((data) => data.json())
        .then((orders) => {
            this.all_orders = orders;
        });
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
                <Route path="/orders">
                    <Orders orders={Array(this.all_orders)}/>
                </Route>
                <Route path="/create" component={CreateMenuItemPage}></Route>
            </Switch>
            <Footer/>
        </Router>
        );
    }
}