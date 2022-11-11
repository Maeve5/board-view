import React, { useState, useEffect } from 'react';
import TopHeader from '../../components/global/TopHeader';
import Post from '../../components/list/Post';
import { server } from '../../modules/server';
import { AXIOS } from '../../modules/axios';
import { Modal } from 'antd';

function ListKey({ success, isLogin, user, listKey }) {

	const [result, setResult] = useState({});
	const token = user.token;
	
	// 단일 게시글 조회
	const fetchPost = async () => {
		await AXIOS(`/v1/list/${listKey}`, 'get', token)
		.then((response) => {
			setResult(response);
		}).catch((error) => {
			Modal.error({
				title: '오류',
				content: '오류가 발생했습니다.\n관리자에게 문의해주세요.',
			});
		});
	};
	
	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<>
			<TopHeader user={user} isLogin={isLogin} />
			<Post result={result} user={user} listKey={listKey} />
		</>
	);
};

export default React.memo(ListKey);

export const getServerSideProps = async ({ req, params }) => {

	try {
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