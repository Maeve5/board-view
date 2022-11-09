import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import API from '../../modules/api';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function MyInfo({ user }) {

	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState('');

	const onCheckPassword = useCallback(async () => {

		if (!password) {
			setDisabled(true);
			return false;
		}

		try {
			API.defaults.headers.common['Authorization'] = user.token;
			await API.patch(`/v1/user/${user.userKey}`, {
				name: name
			}).then((response) => {
				alert('변경되었습니다.');
				router.replace('/mypage/edit');
				setPassword('');
			});			
		}
		catch (err) {
			alert(err.response.data.message);
		}
	}, [password]);

	return (
		<div className='mypage'>
			<div className='input'>
					<div className='title'>비밀번호</div>
					<div>
						<Input.Password
							placeholder="비밀번호 확인"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
			<div className='button'>
				<Button onClick={onCheckPassword} disabled={disabled}>확인</Button>
			</div>

			<style jsx>{`
			.mypage { display: block; margin: 0 auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; }
			.button { display: flex; align-items: center; justify-content: center; margin-top: 30px; }
			`}</style>
		</div>
	)
};

export default React.memo(MyInfo);