// import React, { useEffect, useState } from 'react';
// // import './App.css';
// import Orders from './components/mealorders';
// import OrderLoadingComponent from './components/OrderLoading';

// function App() {
// 	const OrderLoading = OrderLoadingComponent(Orders);
// 	const [appState, setAppState] = useState({
// 		loading: false,
// 		Orders: null,
// 	});

// 	useEffect(() => {
// 		setAppState({ loading: true });
// 		const apiUrl = `http://127.0.0.1:8000/main/mealorders`;
// 		fetch(apiUrl)
// 			.then((data) => data.json())
// 			.then((Orders) => {
// 				setAppState({ loading: false, Orders: Orders });
// 			});
//     }, [setAppState]);
//     console.log("COME ON NOW")
// 	return (
// 		<div className="App">
// 			<h1>Latest Orders</h1>
// 			<OrderLoading isLoading={appState.loading} Orders={appState.Orders} />
// 		</div>
// 	);
// }
// export default App;


import React, {Component} from "react";
import {render} from "react-dom";
import HomePage from './components/homepage'
// import BreakfastMenu from './components/breakfast'
// import LunchMenu from './components/lunch'
// import DinnerMenu from './components/dinner'
// import CreateMenuItem from './components/create_menuitem_page'

export default class App extends Component {
    constructor(props) {
        super(props)
        // this.state = { // whenever the "state" of the webpage updates we can re-render the component ie when the database updates - so can we display live meal orders coming in???
        //     }
        }

    render() {
        return (
            <div>
                <h1>WOWOWW</h1>
            </div>)
    }
}

const appDiv = document.getElementById("app")
render(<App/>, appDiv)
