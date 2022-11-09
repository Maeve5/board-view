import React, { useState, useEffect, useCallback } from 'react';
import { router } from 'next/router';
import { Button, Input, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

function MyInfo({ user }) {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setName(user.name);
	}, []);

	const onClickButton = useCallback(() => {
		console.log('dd', name);
		if (!name) {
			alert('변경사항을 입력해주세요.');
			return false;
		}
		else {
			setIsModalOpen(true);
		}		
	}, [name]);

	const onChangeInfo = useCallback(async () => {
		if (!password) {
			alert('비밀번호를 입력해주세요.');
			return false;
		}
		try {
			console.log(password);
			// API.defaults.headers.common['Authorization'] = user.token;
			// await API.patch(`/v1/user/${user.userKey}`, {
			// 	name: name
			// }).then((response) => {
			// 	alert('변경되었습니다.');
			// 	router.replace('/mypage/edit');
			// 	setPassword('');
			// });			
		}
		catch (err) {
			alert(err.response.data.message);
		}
	}, []);

	return (
		<div className='mypage'>
			<div className='input'>
				<div className='title'>ID</div>
				<div>
					<Input
						type='text'
						style={{ width: 196 }}
						value={user.id}
						readOnly={true}
						bordered={false}
					/>
				</div>
			</div>
			<div className='input'>
				<div className='title'>이름</div>
				<div>
					<Input
						type='text'
						placeholder="이름을 입력해 주세요."
						style={{ width: 196 }}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			</div>
			<div className='button'>
				<Button onClick={onClickButton}>수정</Button>
			</div>

			{/* 수정 전 비밀번호 확인 모달 */}
			<Modal title='비밀번호 확인' open={isModalOpen} onOk={onChangeInfo} onCancel={() => setIsModalOpen(false)}>
				<Input.Password
					placeholder="비밀번호를 입력해 주세요."
					iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
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

export default React.memo(MyInfo);