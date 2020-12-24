import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	orderTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	orderText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

export default class Orders extends Component {
	constructor(props){
		super(props);
		this.state = {
			orders: []
		}
		this.getOrders()
	}


	// getOrders() {
	// 	const apiUrl = `http://127.0.0.1:8000/main/mealorders`
	// 	fetch(apiUrl)
	// 	.then((data) => data.json())
	// 	.then((data_json) => {
	// 		this.setState({
	// 			orders: data_json
	// 		})
	// 	})
	// }
	// for some reason it recommended to use an async function and it seems to work the same...
	async getOrders() {
		const apiUrl = `http://127.0.0.1:8000/main/mealorders`
		const data = await fetch(apiUrl);
		const data_json = await data.json();
		// PROBABLY NEED TO DO THE FILTERING BY TIME IN THIS FUNCTION
		this.setState({
			orders: data_json
		});
	}

	render() {
		console.log(this.state.orders)
		return (
			<div>
				THIS WILL BE REPLACED BY A LOADING THING
				NEXT UP: IF TIME IS 0815 - 1230 SHOW LUNCH ORDERS, ETC FOR BFAST AND DINNER
				{this.state.orders.filter(allorder => allorder.type === "Dinner").map(order => (
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
				{/* {this.state.orders} */}
			</div>
		)
	}
}


// const Orders = (props) => {
// 	console.log(props.all_orders)
// 	const { Orders } = props;
// 	console.log("===")
// 	console.log(Orders)
// 	const classes = useStyles();
// 	if (!Orders || Orders.length === 0) return <p>Can not find any Orders, sorry</p>;
// 	return (
// 		<React.Fragment>
// 			<Container maxWidth="md" component="main">
// 				<Grid container spacing={5} alignItems="flex-end">
// 					{Orders.map((order) => {
// 						return (
// 							// Enterprise card is full width at sm breakpoint
// 							<Grid item key={order.id} xs={12} md={4}>
// 								<Card className={classes.card}>
// 									<CardMedia
// 										className={classes.cardMedia}
// 										image="https://source.unsplash.com/random"
// 										title="Image title"
// 									/>
// 									<CardContent className={classes.cardContent}>
// 										<Typography
// 											gutterBottom
// 											variant="h6"
// 											component="h2"
// 											className={classes.orderTitle}
// 										>
// 											{order.member.substr(0, 50)}...
// 										</Typography>
// 										<div className={classes.orderText}>
// 											<Typography
// 												component="p"
// 												color="textPrimary"
// 											></Typography>
// 											<Typography variant="p" color="textSecondary">
// 												{order.notes.substr(0, 60)}...
// 											</Typography>
// 										</div>
// 									</CardContent>
// 								</Card>
// 							</Grid>
// 						);
// 					})}
// 				</Grid>
// 			</Container>
// 		</React.Fragment>
// 	);
// };
// export default Orders;