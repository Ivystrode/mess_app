import React, {Component} from "react";
import Button from "@material-ui/core/button";
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/typography";
import Textfield from "@material-ui/core/Textfield";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Link} from "react-router-dom";

export default class CreateMenuItem extends Component {
    defaultQuantity = 10;
    defaultPrice = 1.0;
    defaultType = "Lunch";
    
    constructor(props) {
        super(props);
        this.state = { // if the state ever changes it automatically refreshes the component
            quantity: this.defaultQuantity,
            price: this.defaultPrice,
            type: this.defaultType,
            item: "",
        }
        // NOW WE HAVE TO BIND ALL ONCLICK FUNCTIONS TO THE "THIS" KEYWORD SO THEY ACTUALLY WORK
        this.handleCreateButtonPressed = this.handleCreateButtonPressed.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleItemChange = this.handleItemChange.bind(this)
        this.handleTypeChange = this.handleTypeChange.bind(this)
    }

    handleQuantityChange(e) {
        // console.log("ITEM CHANGE: " + e.target.value)
        this.setState({
            quantity: e.target.value,
        })
    }
    handlePriceChange(e) {
        // console.log("PRICE CHANGE: " + e.target.value)
        this.setState({
            price: e.target.value,
        })
    }
    handleTypeChange(e) {
        // console.log("TYPE CHANGE: " + e.target.value)
        this.setState({
            type: e.target.value,
        })
    }
    handleItemChange(e) {
        // console.log("ITEM CHANGE: " + e.target.value)
        this.setState({
            item: e.target.value,
        })
    }
    handleCreateButtonPressed() {
        console.log(this.state)

        const requestOptions = {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // these field names must match the fields of the model
                item: this.state.item,
                price: this.state.price,
                type: this.state.type,
                quantity: this.state.quantity,
            }),
        }

        // once we get a response then convert it into json then print it out
        fetch('/main/create-menu-item', requestOptions).then((response) =>
        response.json()
        ).then((data) => console.log(data))
    }

    render() {
        return(
         <Grid container spacing={1}>

            <Grid item xs={12} align="center">
                <Typography component = 'h4' variant='h4'>
                    Add a Menu Item
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl component='fieldset'>
                    <FormHelperText>
                        <div align="center">
                            Type:
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue='Lunch' onChange={this.handleTypeChange}>
                        <FormControlLabel 
                        value='Breakfast' 
                        control={<Radio color='primary'/>}
                        label='Breakfast'
                        labelPlacement='bottom'
                        />
                        <FormControlLabel 
                        value='Lunch' 
                        control={<Radio color='primary'/>}
                        label='Lunch'
                        labelPlacement='bottom'
                        />
                        <FormControlLabel 
                        value='Dinner' 
                        control={<Radio color='primary'/>}
                        label='Dinner'
                        labelPlacement='bottom'
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl>
                    <Textfield 
                    required={true} 
                    onChange = {this.handleItemChange}
                    type="text" 
                    inputProps={{
                        style: { textAlign: "center" },
                    }} />
                    <FormHelperText>
                        <div align="center">
                            Name of food item
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl>
                    <Textfield 
                    onChange={this.handlePriceChange}
                    required={true} 
                    type="number" 
                    inputProps={{
                        style: { textAlign: "center" },
                    }} />
                    <FormHelperText>
                        <div align="center">
                            Price
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl>
                    <Textfield 
                    required={true} 
                    onChange={this.handleQuantityChange}
                    type="number" 
                    inputProps={{
                        style: { textAlign: "center" },
                    }} />
                    <FormHelperText>
                        <div align="center">
                            Number available
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={this.handleCreateButtonPressed}>Add Item</Button>
            </Grid>

            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>

        </Grid>
        )
    }
}