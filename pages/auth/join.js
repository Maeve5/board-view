import React from 'react';
import TopHeader from '../../components/global/TopHeader';
import { Button, Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const JoinPage = () => {
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
				<div className='input'>
					<div className='title'>이름</div>
					<div>
						<Input
							type='text'
							placeholder="이름을 입력해 주세요."
							style={{ width: 196 }}
						// value={nickname}
						/>
					</div>
				</div>
        <Button>가입</Button>
			</div>

			<style jsx>{`
			.mypage { margin: 100px auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; }
			`}</style>
		</>
  );
};

export default JoinPage;