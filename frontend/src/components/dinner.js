import { Typography } from "@material-ui/core";
import React, {Component, useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const DinnerMenu = (props) => {
    const { items } = props;
    var d = new Date()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var today = days[d.getDay()]
    console.log("Dinner menu")
    console.log(props)
    if (!items || items.length === 0) return <p>Updating menu...</p>;
    return (
        <React.Fragment>
            <Container maxWidth="md">
                <h2>{today} Dinner Menu</h2>
                <Grid container spacing={5} alignItems="flex-end">
                    {items.filter(allorder => allorder.type === "Dinner").map(item => {
                        return (
                            <form>
                            <Grid item key={item.id} xs={12} md={4}>
                                <label>
                                    {item.item} ({item.price})

                                </label>
                            </Grid> 
                            <input type="submit" value="Submit"/>
                            </form>

                        );
                        })}
                </Grid>
            </Container>
        </React.Fragment>

)}

export default DinnerMenu;