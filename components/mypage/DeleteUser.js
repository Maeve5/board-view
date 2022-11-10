
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { router } from 'next/router';
import API from '../../modules/api';
import { Button, Input, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function DeleteUser({ user }) {

	const [password, setPassword] = useState('');

	// auto focus
	const passwordInput = useRef();

	useEffect(() => {
		passwordInput.current.focus();
	}, []);

	// 회원 탈퇴 모달
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onDelete = useCallback(async () => {
		// 값이 없을 때
		if ( !password ) {
			alert('빈칸이 있습니다.');
			return false;
		}
		try {
			API.defaults.headers.common['Authorization'] = user.token;
			await API.delete(`/v1/user/${user.userKey}`, {
				data: {password: password}
			}).then((response) => {
				alert('탈퇴되었습니다.');
				router.replace('/list');
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
						placeholder="비밀번호"
						iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						ref={passwordInput}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			
			<div className='button'>
				<Button onClick={() => setIsModalOpen(true)} disabled={!password ? true : false}>탈퇴하기</Button>
			</div>

			{/* 탈퇴 확인 모달 */}
			<Modal
				title='알림'
				open={isModalOpen}
				onOk={onDelete}
				onCancel={() => setIsModalOpen(false)}
			>
				<p>정말 탈퇴하시겠어요?</p>
				<p>탈퇴 후 작성한 게시글이 모두 사라집니다.</p>
			</Modal>

			<style jsx>{`
			.mypage { display: block; margin: 0 auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; }
			.button { display: flex; align-items: center; justify-content: center; margin-top: 30px; }
			`}</style>
		</div>
	)
};

export default React.memo(DeleteUser);