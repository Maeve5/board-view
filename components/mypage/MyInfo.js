import React, { useState, useEffect, useCallback, useRef } from 'react';
import { router } from 'next/router';
import API from '../../modules/api'
import { Button, Input, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

function MyInfo({ user }) {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	// auto focus
	const nameInput = useRef();

	useEffect(() => {
		setName(user.name);
		nameInput.current.focus();
	}, []);

	// 이름 변경
	const onClickButton = useCallback(() => {
		// name이 없을 때
		if (!name) {
			Modal.warning({ content: '변경사항을 입력해주세요.' });
			return false;
		}
		// 수정 전/후가 같을 때
		if (user.name === name) {
			Modal.warning({ content: '변경된 사항이 없습니다.' });
			return false;
		}
		// 모달 오픈
		else {
			setIsModalOpen(true);
		}		
	}, [name]);

	// 비밀번호 확인 후 수정
	const onChangeInfo = useCallback(async () => {
		if (!password) {
			Modal.warning({ content: '비밀번호를 입력해주세요.' });
			return false;
		}
		try {
			API.defaults.headers.common['Authorization'] = user.token;
			await API.patch(`/v1/user/${user.userKey}`, {
				name: name,
				password: password
			}).then((response) => {
				Modal.info({
					title: '알림',
					content: '변경되었습니다.',
				});
				router.reload();
				setPassword('');
			});			
		}
		catch (err) {
			// [code] error message
			alert(`[${err.response.status}] ${err.response.data.message}`);
		}
	}, [password]);

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
						ref={nameInput}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			</div>
			<div className='button'>
				<Button onClick={onClickButton} disabled={user.name === name ? true : false}>변경하기</Button>
			</div>

			{/* 수정 전 비밀번호 확인 모달 */}
			<Modal
				title='비밀번호 확인'
				open={isModalOpen}
				onOk={onChangeInfo}
				okButtonProps={{ disabled: password ? false : true }}
				onCancel={() => {
					setIsModalOpen(false);
					setPassword('');
				}}>
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