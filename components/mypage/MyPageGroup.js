import React from 'react';
import { router } from 'next/router';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

function MyPageGroup({ children }) {
	return (
		<>
			<Layout style={{ margin: '64px auto', paddingTop: 24, MaxWidth: 800, width: '70%', background: 'white' }}>
				<Sider width={128} style={{ background: 'white' }}>
					<Menu
						style={{ width: 128 }}
						mode='inline'
						defaultSelectedKeys={['myinfo']}
						onClick={(e) => router.push(`/mypage/${e.key}`)}
						items={[
							{
								key: '',
								label: '내 정보'
							},
							{
								key: 'password',
								label: '비밀번호 변경'
							},
							{
								key: 'history',
								label: '내가 쓴 글'
							},
						]}
					/>
				</Sider>
				<Layout
					style={{
						padding: '0 24px 24px',
						background: 'white'
					}}
				>
					<Content
						className="site-layout-background"
						style={{
							padding: '0 24',
							margin: 0,
							minHeight: 280,
							background: 'white'
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</>
	)
};

export default React.memo(MyPageGroup);