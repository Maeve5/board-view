import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:8082',
	headers: {
		'Authorization': null,
		'Accept': 'Application/json',
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default API;