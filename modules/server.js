import API from '../modules/api';

export const server = async ({ req }) => {
	let data = {
		success: null,
		isLogin: null,
		user: {
			userKey: null,
			id: null,
			name: null,
			token: null
		},
		result: null
	};

	const token = req.cookies.cookie ? req.cookies.cookie : '';

	try {
		// header에 token 추가
		API.defaults.headers.common['Authorization'] = token ? token : '';

		const res = await API.post('/v1/auth/token');
		const { success, isLogin, user, result } = await res.data;
		
		data = {
			...data,
			success: success,
			isLogin: isLogin,
			user: user,
			result: result
		};

		return data;
	}
	catch (err) {
		throw err;
	}
}