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
        this.state = {
            all_orders: null,
            all_menuitems: null,
        }
    }
    componentDidMount() {
        // this fetches the Api data
        // put a function like this on each page
        // one to show all orders
        // then on specific meal pages, to fetch the relevant menuitems
        console.log("homepage mounted")
        const mealorders_api = `http://127.0.0.1:8000/main/mealorders`
        fetch(mealorders_api)
        .then((data) => data.json())
        .then((orders) => {
            this.setState({
                all_orders: orders,
            })
        });

        const menuitems = `http://127.0.0.1:8000/main/menuitems`
        fetch(menuitems)
        .then((data) => data.json())
        .then((orders) => {
            this.setState({
                all_menuitems: orders,
            })
        });
    }
    render() {
        return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/"><h1>This is the home page</h1></Route>

                <Route path="/breakfast" component={BreakfastMenu}>
                    <BreakfastMenu items={this.state.all_menuitems}/>
                </Route>

                <Route path="/lunch" component={LunchMenu}>
                    <LunchMenu items={this.state.all_menuitems}/>
                </Route>

                <Route path="/dinner">
                    <DinnerMenu items={this.state.all_menuitems}/>
                </Route>

                <Route path="/orders">
                    <Orders orders={Array(this.state.all_orders)}/>
                </Route>

                <Route path="/create" component={CreateMenuItemPage}></Route>
            </Switch>
            <Footer/>
        </Router>
        );
    }
}