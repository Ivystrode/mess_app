import { Typography } from "@material-ui/core";
import React, {Component} from "react";

export default class LunchMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            all_items: []
        };
        this.getItems()
        }

    getItems() {
        console.log("test")
        const apiUrl = `http://127.0.0.1:8000/main/menuitems`
        fetch(apiUrl)
        .then((data) => data.json())
        .then((items) => {
            this.setState({
                all_items: items
            })
        });
    }

    render() {
        return (
            <div>
                {this.state.all_items.filter(unsorteditem => unsorteditem.type === "Dinner").map(item =>
                <div key={item.id}>
                    <p>{item.item}: {item.type}</p>
                </div>
                    )}
            </div>         
        ) 
    }
}