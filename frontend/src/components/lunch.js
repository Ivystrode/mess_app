import { Typography } from "@material-ui/core";
import React, {Component} from "react";

const LunchMenu = (props) => {
    const { items } = props;
    console.log("Lunch menu")
    console.log(props)
    if (!items || items.length === 0) return <p>Updating menu...</p>;
    return (
        <React.Fragment>
            {items.filter(allorder => allorder.type === "Lunch").map(item => (
            <div key={item.id}>
                <p>Item: {item.item} - {item.price}</p>
            </div>
            ))}
        </React.Fragment>

)}

export default LunchMenu;