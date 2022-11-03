import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import { server } from '../../modules/server';
import axios from "axios";
import TopHeader from '../../components/global/TopHeader';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const MyEditPage = ({user}) => {

	const [name, setName] = useState(user.name);
	const [password, setPassword] = useState('');
	const [newPassword1, setNewPassword1] = useState('');
	const [newPassword2, setNewPassword2] = useState('');

	const onChange = useCallback (async () => {
		// console.log(password !== newPassword1);

		if ( !name || !password || !newPassword1 || !newPassword2 ) {
			alert('빈칸이 있습니다.');
			return false;
		} else if (password === newPassword1) {
			alert('현재 비밀번호와 다른 비밀번호를 입력해주세요.');
			return false;
		} else if (newPassword1 !== newPassword2) {
			alert('새 비밀번호가 일치하지 않습니다.');
			return false;
		}

		try {
			const res = await axios({
				url: `/v1/user/${user.userKey}`,
				method: 'patch',
				data: {
					name: name,
					password: password,
					newPassword: newPassword1
				},
				baseURL: 'http://localhost:8082',
				headers: {
					'Authorization': user.token,
					'Accept': 'Application/json',
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});
			console.log('res', res);
			alert('변경되었습니다.');
			setPassword('');
			setNewPassword1('');
			setNewPassword2('');
		}
		catch (err) {
			alert(err.response.data.message);
		}
	}, [name, password, newPassword1, newPassword2]);

	return (
		<>
			<TopHeader user={user} />
			<div className='mypage'>
				<div className='input'>
					<div className='title'>이름</div>
					<div>
						<Input
							type='text'
							placeholder="변경할 이름"
							style={{ width: 196 }}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className='input'>
					<div className='title'>비밀번호</div>
					<div>
						<Input.Password
							placeholder="현재 비밀번호"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<div className='input'>
					<div className='title'>새 비밀번호</div>
					<div>
						<Input.Password
							placeholder="변경할 비밀번호"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							value={newPassword1}
							onChange={(e) => setNewPassword1(e.target.value)}
						/>
					</div>
				</div>
				<div className='input'>
					<div className='title'>새 비밀번호 확인</div>
					<div>
						<Input.Password
							placeholder="변경할 비밀번호 재입력"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							value={newPassword2}
							onChange={(e) => setNewPassword2(e.target.value)}
						/>
					</div>
				</div>
				
				<div className='button'>
					<Button onClick={onChange}>수정</Button>
				</div>
			</div>

			<style jsx>{`
			.mypage { margin: 100px auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 110px; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(MyEditPage);

export const getServerSideProps = async ({ req }) => {
	// console.log(req.cookies);
	const method = 'get';
	const uri = `/v1/user`;
	let init = await server({ req, method, uri });
	// console.log('init', init);
	const { success, isLogin, user } = init;

	if (isLogin) {
		return { props: { success, user }};
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login'
			}
		};
	}
};