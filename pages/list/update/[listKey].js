import React, { useState, useCallback, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../../components/global/TopHeader';
import API from '../../../modules/api';
import { AXIOS } from '../../../modules/axios';
import { server } from '../../../modules/server';
import { Input, Button, Modal } from 'antd';
const { TextArea } = Input;

function Update({ success, isLogin, user, listKey }) {
	
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const token = user.token;

	// 단일 게시글 조회
	const fetchPost = async () => {
		await AXIOS(`/v1/list/${listKey}`, 'get', token)
		.then((response) => {
			setTitle(response.title);
			setDescription(response.description);
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

	// 게시글 수정
	const onUpdate = useCallback (async () => {
		// 입력값 없을 때
		if ( !title || !description ) {
			Modal.warning({ content: '빈 칸이 있습니다.' });
			return false;
		}

		try {
			API.defaults.headers.common['Authorization'] = user.token;
			await API.patch(`/v1/list/${listKey}`, {
				title: title,
				description: description
			}).then((response) => {
				Modal.info({
					title: '알림',
					content: '수정되었습니다.'
				});
				router.push(`/list/${listKey}`);
			});
		}
		catch (error) {
			Modal.error({
				title: '오류',
				content: '오류가 발생했습니다.\n관리자에게 문의해주세요.',
			});
		}
	}, [title, description]);

	return (
		<>
			<TopHeader user={user} isLogin={isLogin} />

			<div className='insertpage'>
				<div className='item'>
					<div className='title'>제목</div>
					<div className='input'>
						<Input
							type='text'
							placeholder='제목을 입력해 주세요.'
							style={{ display: 'block' }}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className='item'>
					<div className='title'>내용</div>
					<div className='input'>
						<TextArea
							placeholder='내용을 입력해 주세요.'
							style={{ minHeight: 285, resize: 'none' }}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
				<div className='button'>
					<Button	onClick={onUpdate}>수정</Button>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; max-width: 800px; min-width: 600px; width: 80%; }
			.item { margin: 10px 0; display: flex; align-items: center; justify-content: center; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	)
};

export default React.memo(Update);

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