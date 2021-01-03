import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
	const history = useHistory(); // setting up the redirect

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', { // blacklist used tokens
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login'); // redirect the user!
	});
	return <div>Logout</div>;
}