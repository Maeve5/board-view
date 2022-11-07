import React, { useState, useCallback, useEffect } from 'react';
import { router } from 'next/router';
import { server } from '../../modules/server';
import API from '../../modules/api';
import TopHeader from '../../components/global/TopHeader';
import Post from '../../components/list/Post';
import { Button, Modal } from 'antd';
import { AXIOS } from '../../modules/axios';

function ListKey({ success, isLogin, user, listKey }) {

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState({});
	const token = user.token;
	
	useEffect(() => {
		AXIOS(`/v1/list/${listKey}`, 'get', null, token)
		.then((response) => {
			setResult(response);
			console.log(result);
			return result;
		})
	}, []);

	useEffect(() => {
		setLoading(true);
		if (result) {
			setLoading(false);
		}
		else {
			setLoading(true);
		}
	}, [loading]);
	
	// 삭제
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onDelete = useCallback(async () => {

		try {
			// header에 token 추가
			API.defaults.headers.common['Authorization'] = token;
			// 삭제
			await API.delete(`/v1/list/${listKey}`);
			// 삭제 후 페이지 이동
			router.push(`/list`);
		}
		catch (error) {
			console.log('onDelete 에러', error);
		}
	}, []);

	return (
		<>
			<TopHeader user={user} isLogin={isLogin} />

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
	let init = await server({ req });
	const { success, isLogin, user } = init;

	if (isLogin) {
		return { props: { success, isLogin, user, listKey } };
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/login',
				errorMessage: init.message ? init.message : ''
			}
		};
	}

}