import API from '../modules/api';

export const AXIOS = async (url, method, body, token) => {
	let data = null;

	
	try {
		API.defaults.headers.common['Authorization'] = token;
		
		if (method === 'get' || 'delete') {
			const res = await API({
				url: url,
				method: method
			});

			data = res.data.result;
			return data;
		}
		else {
			const res = await API({
				url: url,
				method: method,
				data: body
			});

			data = res;

			return data;
		}
	}
	catch (error) {
		console.log('axiosErr', error);
		return data;
	}
};