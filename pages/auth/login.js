import { Button, Input } from 'antd';
import React from 'react';
import TopHeader from '../../components/global/TopHeader';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

function LoginPage() {
	return (
		<>
			<TopHeader></TopHeader>
			<div className='mypage'>
				<div className='input'>
					<div className='title'>ID</div>
					<div>
						<Input
							type='text'
							placeholder="아이디를 입력해 주세요."
							style={{ width: 196 }}
						// value={name}
						/>
					</div>
				</div>
				<div className='input'>
					<div className='title'>비밀번호</div>
					<div>
						<Input.Password
							placeholder="비밀번호를 입력해 주세요."
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						/>
					</div>
				</div>
				<div className='button'>
					<Button>로그인</Button>
				</div>
			</div>

			<style jsx>{`
			.mypage { margin: 100px auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default LoginPage;