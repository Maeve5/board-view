import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:8082',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default API;