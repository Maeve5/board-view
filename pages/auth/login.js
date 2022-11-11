import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Button, Input, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

function LoginPage() {

	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	// 로그인
	const onLogin = useCallback(async () => {
		// 입력값 없을 때
		if (!id || !password ) {
			Modal.warning({ content: '빈 칸이 있습니다.' });
			return false;
		}

		try {
			await API.post('/v1/auth/login', {
				id: id,
				password: password,
			}).then((response) => {
				Modal.info({
					title: '알림',
					content: '로그인 성공',
				});
				router.replace('/list');
			}).catch((error) => {
				// 로그인 실패
				if (error.response.status === 400) {
					Modal.warning({ content: error.response.data });
				}
				else {
					Modal.error({
						title: '오류',
						content: error.response.data,
					});
				}
			});
		}
		catch (error) {
			Modal.error({
				title: '오류',
				content: '오류가 발생했습니다.\n관리자에게 문의해주세요.',
			});
		}

	}, [id, password]);

	return (
		<>
			<TopHeader />

			<div className='mypage'>
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