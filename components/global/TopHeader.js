import React, { useCallback } from 'react';
import router from 'next/router';
import { useRecoilState } from 'recoil';
import loginState from '../../atom/loginState';
import { Button, Layout, Menu } from 'antd';
import API from '../../modules/api';
const { Header, Content, Footer } = Layout;

function TopHeader() {

	const [isLogin, setIsLogin] = useRecoilState(loginState);

	const onLogout = useCallback(async () => {
		setIsLogin(false);
		// await API.post('/v1/auth/logout')
		router.push('/list');
	}, [isLogin]);

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
							onClick={(e) => router.push(`/${e.key}`)}
							items={[
								{
									key: 'list',
									label: '게시판'
								},
								isLogin ?
								{
									key: 'my',
									label: '마이페이지'
								} : null,
							]}
						/>
						{isLogin ? 
							<>
								<div className='name'>님</div>
								<Button onClick={onLogout}>로그아웃</Button>
							</>
							: <>
								<Button onClick={() => router.push('/auth/login')}>로그인</Button>
								<Button onClick={() => router.push('/auth/join')}>회원가입</Button>
							</>
						}
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