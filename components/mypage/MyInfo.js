import React from 'react';
import { router } from 'next/router';
import { Button, Input } from 'antd';

function MyInfo({ user }) {
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
						placeholder="이름을 입력해 주세요."
						style={{ width: 196 }}
						value={user ? user.name : ''}
						readOnly={true}
						bordered={false}
					/>
				</div>
			</div>
			<div className='button'>
				<Button onClick={() => router.push('/mypage/myinfo/edit')}>수정</Button>
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