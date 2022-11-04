import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import { server } from '../../modules/server';
import API from '../../modules/api';
import axios from "axios";
import TopHeader from '../../components/global/TopHeader';
import Post from '../../components/list/Post';
import { Button, Modal } from 'antd';

function ListKey({ success, user, result, listKey }) {

	// 삭제
	const [isModalOpen, setIsModalOpen] = useState(false);


	const onDelete = useCallback (async () => {
		
		try {
			await axios({
				url: `/v1/list/${listKey}`,
				method: 'delete',
				baseURL: 'http://localhost:8082',
				headers: {
					'Authorization': user.token,
					'Accept': 'Application/json',
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});
			// await API.delete(`/v1/list/${listKey}`);
			router.push(`/list`);
		}
		catch (error) {
			console.log('onDelete 에러', error);
		}
	}, []);

	return (
		<>
			<TopHeader user={user} />

			<Post result={result} />

			{/* 작성자일 때 */}
			{result.userKey === user.userKey ?
				<div className='button'>
					<Button style={{ marginRight: '5px' }} onClick={() => router.push(`/list/update/${listKey}`)}>수정</Button>
					<Button onClick={() => setIsModalOpen(true)}>삭제</Button>
				</div>
				: ''
			}

			{/* 삭제 확인 모달 */}
			<Modal title='알림' open={isModalOpen} onOk={onDelete} onCancel={() => setIsModalOpen(false)}>
				<p>삭제하시겠습니까?</p>
			</Modal>

			<style jsx>{`
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(ListKey);

export const getServerSideProps = async ({ req, params }) => {
	let listKey = params.listKey;
	console.log('listKey',listKey);
	const method = 'get';
	const uri = `/v1/list/${params.listKey}`;
	// console.log(req);
	let init = await server({ req, method, uri });
	// console.log('init', init);
	const { success, isLogin, user, result } = init;

	if (isLogin) {
		return { props: { success, user, result, listKey }};
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