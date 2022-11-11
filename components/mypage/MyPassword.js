import React, { useState, useCallback, useEffect, useRef } from 'react';
import { router } from 'next/router';
import API from '../../modules/api';
import { Button, Input, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function MyPassword({ user }) {

	const [password, setPassword] = useState('');
	const [newPassword1, setNewPassword1] = useState('');
	const [newPassword2, setNewPassword2] = useState('');

	// auto focus
	const passwordInput = useRef();

	useEffect(() => {
		passwordInput.current.focus();
	}, []);

	// 비밀번호 변경
	const onChangePW = useCallback(async () => {
		// 값이 없을 때
		if ( !password || !newPassword1 || !newPassword2 ) {
			Modal.warning({
				title: '변경 실패',
				content: '빈 칸이 있습니다.\n빈 칸을 채워주세요.'
			});
			return false;
		}
		// 현재 비밀번호 !== 새 비밀번호
		else if (password === newPassword1) {
			Modal.warning({
				title: '변경 실패',
				content: '현재 비밀번호와 다른 비밀번호를 입력해주세요.'
			});
			return false;
		}
		// 새 비밀번호 !== 새 비밀번호 확인
		else if (newPassword1 !== newPassword2) {
			Modal.warning({
				title: '변경 실패',
				content: '새 비밀번호가 일치하지 않습니다.'
			});
			return false;
		}

		try {
			API.defaults.headers.common['Authorization'] = user.token;
			await API.patch(`/v1/user/${user.userKey}`, {
				password: password,
				newPassword: newPassword1
			}).then((response) => {
				Modal.info({
					title: '알림',
					content: '변경되었습니다.',
				});
				router.reload();
				setPassword('');
				setNewPassword1('');
				setNewPassword2('');
			}).catch((error) => {
				if (error.response.status === 400) {
					Modal.warning({
						title: '변경 실패',
						content: error.response.data,
					});
				}
				else {
					Modal.error({
						title: '오류',
						content: '오류가 발생했습니다.\n관리자에게 문의해주세요.',
					});
				}
			});
		}
		catch (err) {
			Modal.error({
				title: '오류',
				content: err.response.data.message,
			});
		}
	}, [password, newPassword1, newPassword2]);

	return (
		<div className='mypage'>
			<div className='input'>
				<div className='title'>비밀번호</div>
				<div>
					<Input.Password
						placeholder="현재 비밀번호"
						iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						ref={passwordInput}
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
				<Button onClick={onChangePW} disabled={!password || !newPassword1 || !newPassword2 ? true : false}>변경하기</Button>
			</div>

			<style jsx>{`
			.mypage { display: block; margin: 0 auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 120px; }
			.button { display: flex; align-items: center; justify-content: center; margin-top: 30px; }
			`}</style>
		</div>
	)
};

export default React.memo(MyPassword);