import API from '../modules/api';

export const login = async (req) => {

	let data = {
		isLogin: null,
		token: null,
		userKey: null,
		id: null,
		name: null,
	};

	const token = req.cookies.cookie ? req.cookies.cookie :null;

	data = {
		...data, token,
	};

	try {
		if (token === null) {
			throw new Error('로그인이 필요합니다.')
		}

		
	}
	catch (err) {
		
	}
}