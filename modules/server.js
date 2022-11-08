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
		// if (token === null) {
		// 	throw new Error('로그인이 필요합니다.')
		// }

		// if (uri)
		// header에 token 추가
		if (token) {
			API.defaults.headers.common['Authorization'] = token ? token : '';
		}

		const res = await API.post('/v1/auth/token');

		const { success, isLogin, user, result } = await res.data;

		data = {
			...data,
			success: success,
			isLogin: isLogin,
			user: user ? user : null,
			result: result
		};

		return data;
	}
	catch (err) {
		console.log('err??', err);
		// data = {
		// 	success: err.response.data.success,
		// 	isLogin: err.response.data.isLogin,
		// 	errCode: err.response.status,
		// 	message: err.response.data.message
		// }
		return data;
	}
}