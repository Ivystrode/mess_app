import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/main/';

// building a connection to the API
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: { // see AUTH HEADER TYPES in settings.py
        Authorization: localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token') // the space after JWT is important - the access token goes after it, it gets stored in localstorage of the browser and accessed from there
        : null,
        'Content-Type':'application/json',
        accept: 'application/json',
    },
});

export default axiosInstance;