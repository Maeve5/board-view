import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Button, Input, Modal } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

function JoinPage() {

	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	// 회원가입
	const onJoin = useCallback(async () => {
		// 입력값 없을 때
		if (!id || !password || !name) {
			Modal.warning({ content: '빈 칸이 있습니다.' });
			return false;
		}

		try {
			await API.post('/v1/user', {
				id: id,
				password: password,
				name: name,
			}).then((response) => {
				Modal.info({
					title: '환영합니다',
					content: '가입되었습니다.'
				});
			})
			router.push('/auth/login');
		}
		catch (error) {
			// '동일한 아이디가 있습니다.'
			if (error.response.status === 400) {
				Modal.warning({ content: error.response.data });
			}
			else {
				Modal.error({
					title: '오류',
					content: error.response.data
				});
			}
		}

	}, [id, password, name]);

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
				<div className='item'>
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
					<Button onClick={onJoin}>가입</Button>
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

export default React.memo(JoinPage);