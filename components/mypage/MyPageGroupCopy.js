import React, { useState } from 'react';
import { router } from 'next/router';
import { Layout, Menu, Tabs } from 'antd';
import MyInfo from './Myinfo';
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

function MyPageGroup({ user }) {

	const [activeKey, setActiveKey] = useState('');

	return (
		<>
			{/* 마이페이지 */}
			<Layout style={{ margin: '64px auto', paddingTop: 24, MaxWidth: 800, width: '70%', background: 'white' }}>
				<Tabs defaultActiveKey='myinfo'
					// activeKey={activeKey} onChange={(e) => setActiveKey(e)}
				>
					<TabPane key='myinfo' tab='내 정보'>
						<MyInfo user={user} />
					</TabPane>
					<TabPane key='password' tab='비밀번호 변경'>
						<MyInfo user={user} />
					</TabPane>
					<TabPane key='history' tab='내가 쓴 글'>
						<MyInfo user={user} />
					</TabPane>
				</Tabs>
			</Layout>
		</>
	)
};

export default React.memo(MyPageGroup);