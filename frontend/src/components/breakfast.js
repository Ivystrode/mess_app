import { Typography } from "@material-ui/core";
import React, {Component} from "react";
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

const BreakfastMenu = (props) => {
    const { items } = props;
    const {register, handleSubmit, errors} = useForm();

    var d = new Date()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = days[d.getDay()]

    const onSubmit = (order) => {
        console.log("Breakfast order placed")
        console.log(order)
    }


    console.log("Breakfast menu")
    console.log(props)
    if (!items || items.length === 0) return <p>Updating menu...</p>;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{today} Breakfast Menu</h2>
            {items
            .filter(unsorteditem => unsorteditem.type === "Breakfast").map(item => {
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

export default BreakfastMenu;