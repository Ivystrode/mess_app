import { Typography } from "@material-ui/core";
import React, {Component, useState, useEffect} from "react";
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';

const DinnerMenu = (props) => {
    const history = useHistory()
    const { items } = props;
    const {register, handleSubmit, errors} = useForm();
 
    var d = new Date()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = days[d.getDay()]
 
    const onSubmit = (order) => {
        console.log("Dinner order placed:")
        // console.log(order)
        // console.log(Object.keys(order))
        const itemsOrdered = [];
        let orderTotal = 0.0;
        for (const key in order) {
            if (order.hasOwnProperty(key)) {
                if (order[key] !== false) {
                    console.log(key + ": " + order[key])
                    itemsOrdered.push(key)
                    orderTotal += Number(order[key])
                }
            }
        }
        console.log("ORDER SUMMARY:")
        console.log(itemsOrdered)
        console.log("ORDER TOTAL: ")
        console.log(orderTotal)

        axiosInstance
        .post(`mealorders/`, { // must be the same as what is in the core urls file!
            type: 'dinner',
            total_price: orderTotal,
            // member: ,
            // time_placed: ,
            notes: '',
            items: itemsOrdered,
            // acknowledged: false,
        })
        .then((res) => {
            history.push('/dinner'); // the redirect we mentioned earlier - user will be taken to this page when they register
            console.log("USER REDIRECTED - RESPONSE DATA:")
            console.log(res);
            console.log(res.data);
        });

    }
 
    // console.log("Dinner items:")
    // console.log(items)
 
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
                        <input type="checkbox" ref={register} name={item.item} value={item.price} />
                    </div>
                );
            })}
            <input type="submit" value="Submit order"></input>
        </form>
    )
 
}
 
export default DinnerMenu;
