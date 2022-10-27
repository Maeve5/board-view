import React from 'react';

// 컴포넌트
import { Modal, Button, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import router from 'next/router';

function TopHeader() {	

	return (
		<>
			<Layout style={{ position: 'sticky' }}>
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
							onClick={(e) => router.push(`/${e.key}`)}
							items={[
								{
									key: 'list',
									icon: <TeamOutlined />,
									label: '게시판'
								},
								{
									key: 'my',
									icon: <UserOutlined />,
									label: '마이페이지'
								},
							]}
						/>
						<Button onClick={() => router.push('/auth/login')}>로그인</Button>
						<Button onClick={() => router.push('/auth/join')}>회원가입</Button>
					</div>
				</Header>
			</Layout>

			< style jsx>{`
            .header-content {width: 1024px; display: flex; align-items: center;}
            .logo {margin-right: 40px;}
            .logo p {margin: 0; font-size: 16px;}

            `}</style>
		</>
	);
};

export default React.memo(TopHeader);