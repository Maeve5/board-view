import React, { useState, useEffect, useCallback } from 'react';
import router from 'next/router';
import API from '../../modules/api';
import { AXIOS } from '../../modules/axios';
import { Button, Layout, Menu, Modal } from 'antd';
const { Header } = Layout;

function TopHeader({ user, isLogin }) {

	// 로그인 상태
	const [login, setLogin] = useState(false);

	// 메뉴 활성화
	const [selectedKeys, setSelectedKeys] = useState('');
	
	// 로그인 상태, 메뉴 활성화
	useEffect(() => {
		let path = router.pathname.slice(1);
		
		if(isLogin) {
			setLogin(true);
			setSelectedKeys(path);
		}
	}, []);
	
	// 로그아웃
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onLogout = useCallback(async () => {
		const res = await API.post(`/v1/auth/logout`);
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
						minWidth: 600,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
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
							defaultSelectedKeys={['list']}
							selectedKeys={selectedKeys}
							onClick={(e) => router.push(`/${e.key}`)}
							items={[
								{
									key: 'list',
									label: '게시판'
								},
								// 로그인 했을 때만
								login ?
								{
									key: 'mypage',
									label: '마이페이지'
								} : null,
							]}
						/>

						{/* 로그인 여부에 따라*/}
						{login ? 
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