import React, { useState } from 'react';
import { router } from 'next/router';
import { server } from '../../modules/server';
import TopHeader from '../../components/global/TopHeader';
import { Button, Input } from 'antd';

const MyPage = ({ user }) => {


	// const initData = useCallback(() => {
	// 	setName();
	// 	setNickname();
	// }, []);


	return (
		<>
			<TopHeader user ={user} />

			<div className='mypage'>
				<div className='input'>
					<div className='title'>ID</div>
					<div>
						<Input
							type='text'
							placeholder="아이디를 입력해 주세요."
							style={{ width: 196 }}
							value={user ? user.id : ''}
							readOnly={true}
							bordered={false}
						/>
					</div>
				</div>
				<div className='input'>
					<div className='title'>이름</div>
					<div>
						<Input
							type='text'
							placeholder="이름을 입력해 주세요."
							style={{ width: 196 }}
							value={user ? user.name : ''}
							readOnly={true}
							bordered={false}
						/>
					</div>
				</div>

				<div className='button'>
					<Button onClick={() => router.push('/mypage/edit')}>수정</Button>
				</div>
			</div>

			<style jsx>{`
			.mypage { margin: 100px auto; width: fit-content; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { width: 70px; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(MyPage);

export const getServerSideProps = async ({ req }) => {
	// console.log(req.cookies);
	const method = 'get';
	const uri = `/v1/user`;
	let init = await server({ req, method, uri });
	console.log('init', init);
	const { success, isLogin, user } = init;

	if (isLogin) {
		return { props: { success, user }};
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