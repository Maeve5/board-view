import API from '../modules/api';
import axios from 'axios';

export const AXIOS = async (url, method, token, body) => {
	let data = null;

	console.log('axiosbody', body);
	try {
		// header에 token 추가
		API.defaults.headers.common['Authorization'] = token;
		
		if (method === 'get' || 'delete') {
			const res = await API({
				url: url,
				method: method
			});
			data = res.data.result;
			console.log('nobodydata', data);
			return data;
		}
		else {
		// 	axios({
		// 		method: method,
		// 		url: url,
		// 		body: 'vvvvv',
		// 		baseURL: 'http://localhost:8082',
		// 		headers: {
		// 			'Accept': 'Application/json',
		// 			'Content-Type': 'application/json',
		// 		},
		// 		withCredentials: true,
		// 	});
			const res = await API({
				url: url,
				method: method,
				data: {
					title: body.title,
					description: body.description,
					userKey: body.userKey
				},
			});
			data = res.data.result;
			console.log('bodydata', data);
			return data;
		}
	}
	catch (error) {
		data = {
			success: false,
			errCode: error.response.status,
			message: error.response.data
		};
		console.log('axiosdata', data);
		return data;
	}
};