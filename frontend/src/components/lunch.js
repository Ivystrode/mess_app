import { Typography } from "@material-ui/core";
import React, {Component} from "react";
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

const LunchMenu = (props) => {
    const { items } = props;
    const {register, handleSubmit, errors} = useForm();

    var d = new Date()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = days[d.getDay()]

    const onSubmit = (order) => {
        console.log("Lunch order placed")
        console.log(order)
    }


    console.log("Lunch menu")
    console.log(props)
    if (!items || items.length === 0) return <p>Updating menu...</p>;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{today} Lunch Menu</h2>
            {items
            .filter(unsorteditem => unsorteditem.type === "Lunch").map(item => {
                return (
                    <div key={item.id}>
                        <label>{item.item} - {item.price}</label>
                        <input type="checkbox" ref={register} name={item.item}/>
                    </div>
                )
            })
            }
            <input type="Submit" value="Submit order"/>
        </form>
        
    )

}

export default LunchMenu;