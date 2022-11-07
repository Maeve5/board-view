import React, { useState, useCallback, useEffect } from 'react';
import { router } from 'next/router';
import { useSetRecoilState, useRecoilState } from 'recoil';
import loginState from '../../atom/loginState';
import spinState from '../../atom/spinState';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Button, Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

function LoginPage({ token }) {

	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const setIsLogin = useSetRecoilState(loginState);

	const onLogin = useCallback(async () => {

		if (!id || !password ) {
			alert('빈 칸이 있습니다.');
			return false;
		}

		// 로그인
		try {
			const res = await API.post('/v1/auth/login', {
				id: id,
				password: password,
			})
			// 로그인 성공
			if (res.data.success) {
				setIsLogin(true);
				alert('로그인 성공');
				router.replace('/list');
			}
			// 로그인 실패
			else {
				// if (!result2)
				alert(res.data.message);
			}
		}
		catch (error) {
			// if (result.length === 0)
			console.log('onLogin 에러', error);
			// alert(error.response.data.message);
		}

	}, [id, password]);

	return (
		<>
			<TopHeader />

			<div className='mypage'>
				<form ></form>
				<div className='item'>
					<div className='title'>ID</div>
					<div>
						<Input
							type='text'
							placeholder="아이디를 입력해 주세요."
							style={{ width: 196 }}
							value={id}
							onChange={(e) => setId(e.target.value)}
						/>
					</div>
				</div>
				<div className='item'>
					<div className='title'>비밀번호</div>
					<div>
						<Input.Password
							placeholder="비밀번호를 입력해 주세요."
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<div className='button'>
					<Button onClick={onLogin}>로그인</Button>
				</div>
			</div>

			<style jsx>{`
			.mypage { margin: 100px auto; width: fit-content; }
			.item { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(LoginPage);

export const getServerSideProps = async ({ req }) => {
	console.log('reqLogin', !req.cookies.cookie);
	const token = { cookies: req.cookies.cookie ? req.cookies.cookie : '' };
	return { props : { token }};
	// try {
	// 	const method = 'get';
	// 	const uri = `/v1/list`;
	// 	let init = await server({ req, method, uri });
	// 	const { success, isLogin, user, result } = init;
	// 	console.log('init', init);
		
	// 	return { props: { req }};
	// }
	// catch (err) {
	// 	return console.log(err);
	// }
}