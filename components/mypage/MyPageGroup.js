import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Tabs } from 'antd';
import MyInfo from './Myinfo';
import MyPassword from './MyPassword';
import MyPostsGroup from './MyPostsGroup';
import DeleteUser from './DeleteUser';

function MyPageGroup({ user }) {

	// 탭 아이템
	const items = [
			{
				label: '내 정보',
				key: 'myinfo',
				children: <MyInfo user={user} />
			},
			{
				label: '비밀번호 변경',
				key: 'password',
				children: <MyPassword user={user} />
			},
			{
				label: '내가 쓴 글',
				key: 'history',
				children: <MyPostsGroup user={user} />
			},
			{
				label: '탈퇴하기',
				key: 'delete',
				children: <DeleteUser user={user} />
			}
		];

	// 탭 활성화
	// const [activeKey, setActiveKey] = useState('myinfo');

	// useEffect(() => {
	// 	let key = localStorage.getItem('TabKey');
	// 	console.log('key', key);
	// 	setActiveKey(key);
	// }, []);

	// const onSaveTabKey = useCallback((e) => {
	// 	localStorage.setItem('TabKey', e);
	// }, [activeKey]);
	

	return (
		<>
			{/* 마이페이지 */}
			<Layout style={{ margin: '64px auto', paddingTop: 24, minWidth: 600, width: '70%', background: 'white' }}>
				<Tabs
					tabPosition='left'
					defaultActiveKey='myinfo'
					// activeKey={activeKey}
					// onTabClick={onSaveTabKey}
					items={items} />
			</Layout>
		</>
	)
};

export default React.memo(MyPageGroup);