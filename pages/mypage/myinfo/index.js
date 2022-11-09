import React from 'react';
import TopHeader from '../../../components/global/TopHeader';
import MyPageGroup from '../../../components/mypage/MyPageGroup';
import MyInfo from '../../../components/mypage/MyInfo'
import { server } from '../../../modules/server';

function MyInfoPage({ user, isLogin }) {
	return (
		<>
			<TopHeader user={user} isLogin={isLogin} />
			<MyPageGroup user={user}>
				<MyInfo user={user} />
			</MyPageGroup>
		</>
	)
};

export default React.memo(MyInfoPage);

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