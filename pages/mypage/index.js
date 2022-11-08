import React, { useState } from 'react';
import { router } from 'next/router';
import { server } from '../../modules/server';
import TopHeader from '../../components/global/TopHeader';
import MyPageGroup from '../../components/mypage/MyPageGroup';
import { Menu } from 'antd';

function MyPage({ user }) {

	return (
		<>
			<MyPageGroup user={user} />
		</>
	);
};

export default React.memo(MyPage);

export const getServerSideProps = async ({ req }) => {
	let init = await server({ req });
	const { success, isLogin, user } = init;

	if (isLogin) {
		return { props: { success, isLogin, user }};
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login'
			}
		};
	}
};