import React, { useState, useEffect, useCallback } from 'react';
import router from 'next/router';
import { useRecoilState } from 'recoil';
import loginState from '../../atom/loginState';
import axios from "axios";
import API from '../../modules/api';
import { Button, Layout, Menu, Modal } from 'antd';
const { Header, Content, Footer } = Layout;

function TopHeader({ user }) {

	const [isLogin, setIsLogin] = useRecoilState(loginState);

	// 로그인 상태 유지
	useEffect(() => {
		if (user) {
			setIsLogin(true);
		}
	}, []);
	
	// 로그아웃
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onLogout = useCallback(async () => {
		setIsLogin(false);
		await axios({
			url: `/v1/auth/logout`,
			method: 'post',
			data: {
				userKey: user.userKey
			},
			baseURL: 'http://localhost:8082',
			headers: {
				'Authorization': user.token,
				'Accept': 'Application/json',
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		});
		router.push('/list');
	}, []);

	return (
		<>
			<Layout style={{ position: 'sticky', zIndex: 100 }}>
				<Header
					style={{
						background: 'white',
						position: 'fixed',
						zIndex: 500,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div className="header-content">
						<div className="logo">
							<p>BOARD</p>
						</div>
						<Menu
							style={{ flex: 1 }}
							theme="light"
							mode="horizontal"
							// defaultSelectedKeys={}
							onClick={(e) => router.push(`/${e.key}`)}
							items={[
								{
									key: 'list',
									label: '게시판'
								},
								// 로그인 했을 때만
								isLogin ?
								{
									key: 'mypage',
									label: '마이페이지'
								} : null,
							]}
						/>
						
						{/* 로그인 여부에 따라*/}
						{isLogin ? 
							<>
								<div className='name'>{user ? user.name : ''} 님</div>
								<Button onClick={() => setIsModalOpen(true)}>로그아웃</Button>
							</>
							: <>
								<Button style={{ marginRight: '5px' }} onClick={() => router.push('/auth/login')}>로그인</Button>
								<Button onClick={() => router.push('/auth/join')}>회원가입</Button>
							</>
						}

						{/* 로그아웃 확인 모달 */}
						<Modal title='알림' open={isModalOpen} onOk={onLogout} onCancel={() => setIsModalOpen(false)}>
							<p>로그아웃하시겠습니까?</p>
						</Modal>
					</div>
				</Header>
			</Layout>

			< style jsx>{`
            .header-content {width: 1024px; display: flex; align-items: center;}
            .logo {margin-right: 40px;}
            .logo p {margin: 0; font-size: 16px;}

			.name { margin-right: 20px; }
            `}</style>
		</>
	);
};

export default React.memo(TopHeader);