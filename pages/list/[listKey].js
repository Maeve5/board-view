import React, { useState, useCallback, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import Post from '../../components/list/Post';
import { server } from '../../modules/server';
import { AXIOS } from '../../modules/axios';
import { Button, Modal } from 'antd';

function ListKey({ success, isLogin, user, listKey }) {

	// const [loading, setLoading] = useState(false);
	const [result, setResult] = useState({});
	const token = user.token;

	// if(!token)
	
	// 단일 게시글 조회
	useEffect(() => {
		AXIOS(`/v1/list/${listKey}`, 'get', token)
		.then((response) => {
			setResult(response);
			return result;
		})
	}, []);

	// useEffect(() => {
	// 	setLoading(true);
	// 	if (result) {
	// 		setLoading(false);
	// 	}
	// 	else {
	// 		setLoading(true);
	// 	}
	// }, [result]);
	
	// 삭제
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onDelete = useCallback(async () => {
		try {
			AXIOS(`/v1/list/${listKey}`, 'delete', token)
			.then((response) => {
				router.push(`/list`);
			});
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
};