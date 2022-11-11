import React from 'react';
import { server } from '../../modules/server';
import TopHeader from '../../components/global/TopHeader';
import MyPageGroup from '../../components/mypage/MyPageGroup';

function MyPage({ isLogin, user }) {

	return (
		<>
			<TopHeader user={user} isLogin={isLogin} />
			{/* 마이페이지 */}
			<MyPageGroup user={user} />
		</>
	);
};

export default React.memo(MyPage);

export const getServerSideProps = async ({ req }) => {
	
	try {
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
	}
	catch (err) {
		let error = {};
		if (err.response?.status === 500 || err.code === 'ECONNREFUSED' || 'ECONNRESET' || 'ERR_BAD_RESPONSE') {
			error = {
				redirect: {
					permanent: false,
					destination: '/500'
				}
			}
		}
		else {
			error = {
				redirect: {
					permanent: false,
					destination: '/404'
				}
			}
		}
		return error;
	}
};