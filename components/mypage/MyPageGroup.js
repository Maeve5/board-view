import React from 'react';
import { router } from 'next/router';
import TopHeader from '../global/TopHeader';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

function MyPageGroup({ user, children }) {
	return (
		<>
			<TopHeader user={user} />
			{/* <Layout
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',

				}}>
				<div className='menu'>
					<Menu
						style={{ width: 128 }}
						mode='inline'
						onClick={(e) => router.push(`/mypage/${e.key}`)}
						items={[
							{
								key: 'myinfo',
								label: '내 정보'
							},
							{
								key: 'edit',
								label: '비밀번호 변경'
							},
							{
								key: 'history',
								label: '내가 쓴 글'
							},
						]}
					/>
				</div>
				<div className='content'>
					<Content>
						{children}
					</Content>
				</div>
			</Layout> */}
			<Layout style={{ margin: '64px auto', paddingTop: 24, MaxWidth: 800, width: '70%', background: 'white' }}>
				<Sider width={128} style={{ background: 'white' }}>
					<Menu
						Menu
						style={{ width: 128 }}
						mode='inline'
						onClick={(e) => router.push(`/mypage/${e.key}`)}
						items={[
							{
								key: 'myinfo',
								label: '내 정보'
							},
							{
								key: 'edit',
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