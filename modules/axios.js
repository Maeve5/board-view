import API from './api';

export const AXIOS = async (url, method, token, body) => {
	let data = null;
	try {
		// header에 token 추가
		API.defaults.headers.common['Authorization'] = token;
		// get, delete 요청
		if (method) {
			const res = await API({
				url: url,
				method: method,
				data: body
			});
			data = res.data.result;
			return data;
		}
	}
	catch (error) {
		throw error;
	}
};