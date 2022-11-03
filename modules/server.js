import axios from "axios";

export const server = async ({ req, method, uri, body }) => {
	// console.log('url', req);
	// console.log('method', method);
	// console.log('uri', uri);
	let data = {
		success: null,
		isLogin: null,
		token: null,
		userKey: null,
		id: null,
		name: null,
		user: null,
		result: null,
	};

	const token = req.cookies.cookie ? req.cookies.cookie : null;
	// console.log('token', token);

	data = {
		...data, token,
	};

	try {
		// if (token === null) {
		// 	throw new Error('로그인이 필요합니다.')
		// }

		const res = await axios({
			url: uri,
			method: method,
			data: body,
			baseURL: 'http://localhost:8082',
			headers: {
				'Authorization': req.cookies.cookie ? req.cookies.cookie : '',
				'Accept': 'Application/json',
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})
		const { success, isLogin, user, result } = await res.data;
		// console.log('res.data', res.data);

		data = {
			...data,
			success: success,
			isLogin: isLogin,
			user,
			result
		};

		// console.log('data', data);
		return data;
	}
	catch (err) {
		return data;
	}
}