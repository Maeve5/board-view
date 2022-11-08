import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import API from '../../modules/api';
import { Button, Input } from 'antd';

function MyInfo({ user }) {

	const [name, setName] = useState(user.name);

	const onChangeInfo = useCallback(async () => {

		if (!name) {
			alert('빈칸이 있습니다.');
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
	}, [name]);

	return (
		<div className='mypage'>
			<div className='input'>
				<div className='title'>ID</div>
				<div>
					<Input
						type='text'
						placeholder="아이디를 입력해 주세요."
						style={{ width: 196 }}
						value={user ? user.id : ''}
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
						placeholder="변경할 이름"
						style={{ width: 196 }}
						value={name}
						onChange={(e) => setName(e.target.value)}
						
					/>
				</div>
			</div>
			<div className='button'>
				<Button onClick={onChangeInfo}>수정하기</Button>
			</div>

			<style jsx>{`
			.mypage { display: block; margin: 0 auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; border-right: 1px solid #aaa; }
			.button { display: flex; align-items: center; justify-content: center; margin-top: 30px; }
			`}</style>
		</div>
	)
};

export default React.memo(MyInfo);