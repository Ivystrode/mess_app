import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom'; // user register and gets redirected
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Register() {
	const history = useHistory(); // lets us make a redirect (when user finishes sign up)
	const initialFormData = Object.freeze({
		email: '',
		rank: '',
		surname: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => { // notice this is in every text field - when user types in it it updates the state
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SUBMITTED FORM DATA:")
		console.log(formData);

		axiosInstance
			.post(`user/register/`, { // must be the same as what is in the core urls file!
				email: formData.email,
				rank: formData.rank,
				surname: formData.surname,
				password: formData.password,
			})
			.then((res) => {
                history.push('/login'); // the redirect we mentioned earlier - user will be taken to this page when they register
                console.log("USER REDIRECTED - RESPONSE DATA:")
				console.log(res);
				console.log(res.data);
			});
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel>Rank</InputLabel>
							<Select
							labelId="rank"
							// value={formData.rank}
							name="rank"
							// id="rank"
							onChange={handleChange}>
								<MenuItem value="2Lt">2Lt</MenuItem>
								<MenuItem value="Lt">Lt</MenuItem>
								<MenuItem value="Capt">Capt</MenuItem>
								<MenuItem value="Maj">Maj</MenuItem>
								<MenuItem value="Lt Col">Lt Col</MenuItem>
								<MenuItem value="Guest">Guest</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="surname"
								label="Surname"
								name="surname"
								autoComplete="surname"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Register
					</Button>

					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
                        <Link href="#">
                            Log In
                        </Link>
					</Button>

				</form>
			</div>
		</Container>
	);
}