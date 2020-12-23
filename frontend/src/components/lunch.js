import { Typography } from "@material-ui/core";
import React, {Component} from "react";

export default class LunchMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            all_orders: []
        };
        this.getOrders()
        }

    getOrders() {
        // this fetches the Api data
        // put a function like this on each page
        // one to show all orders
        // then on specific meal pages, to fetch the relevant menuitems
        console.log("test")
        const apiUrl = `http://127.0.0.1:8000/main/mealorders`
        fetch(apiUrl)
        .then((data) => data.json())
        .then((orders) => {
            this.setState({
                all_orders: orders
            })
            console.log(orders)
            console.log("lunch page")
        });
    }

    render() {
        return (
            <div>
               <div>{this.state.all_orders.map(order => (
                   <div key={order.id}>
                       <p>Order number: {order.id}</p>
                       <p>Time Ordered: {order.time_placed} </p>
                       <p>Member: {order.member}</p>
                       <p>Meal: {order.type}</p>
                       <p>Items:</p>
                       <ol>
                            {order.items.map((item) => (
                                <li key={item}>
                                    {item}
                                </li>
                            ))}
                        </ol>


                       <p>Notes: {order.notes} </p>
                       <p>Total Price: {order.total_price} </p>
                       <p>Order Acknowledged: {order.acknowledged.toString()} </p>
                       <p>--------------------</p>
                   </div>
               ))}
               </div>
            </div>            
        ) 
    }
}