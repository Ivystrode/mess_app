import { Typography } from "@material-ui/core";
import React, {Component, useState, useEffect} from "react";
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';

const DinnerMenu = (props) => {
    const { items } = props;
    const {register, handleSubmit, errors} = useForm();
 
    var d = new Date()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = days[d.getDay()]
 
    const onSubmit = (order) => {
        console.log("Dinner order placed:")
        console.log(order)
    }
 
    console.log("Dinner items:")
    console.log(items)
 
    if (!items || items.length === 0) return <p>Updating menu...</p>;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{today} Dinner Menu</h2>
            {items
            .filter((unsorteditem) => unsorteditem.type === "Dinner")
            .map((item) => {
                return (
                    <div key={item.id}>
                        <label>{item.item} - {item.price}</label>
                        <input type="checkbox" ref={register} name={item.item} />
                    </div>
                );
            })}
            <input type="submit" value="Submit order"></input>
        </form>
    )
 
}
 
export default DinnerMenu;
