import { Typography } from "@material-ui/core";
import React, {Component, useState, useEffect} from "react";

const DinnerMenu = (props) => {
    const { items } = props;
    console.log("Dinner menu")
    console.log(props)
    if (!items || items.length === 0) return <p>Nothing on the menu, check back later</p>;
    return (
        <React.Fragment>
            {items.filter(allorder => allorder.type === "Dinner").map(item => (
            <div key={item.id}>
                <p>Item: {item.item} - {item.price}</p>
            </div>
            ))}
        </React.Fragment>

)}

export default DinnerMenu;