import React, { useState, useCallback, useRef, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import { server } from '../../modules/server';
import API from '../../modules/api';
import { Input, Button, Modal } from 'antd';
const { TextArea } = Input;

function InsertPage({ success, isLogin, user }) {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	
	// auto focus
	const nameInput = useRef();

	useEffect(() => {
		nameInput.current.focus();
	}, []);

	// 게시글 작성
	const onInsert = useCallback(async () => {
		// 입력값 없을 때
		if (!title || !description) {
			Modal.warning({ content: '빈 칸이 있습니다.' });
			return false;
		}

		try {
			API.defaults.headers.common['Authorization'] = user.token;
			await API.post(`/v1/list`, {
				title: title,
				description: description,
				userKey: user.userKey,
			}).then((response) => {
				Modal.info({
					title: '알림',
					content: '등록되었습니다.'
				});
				router.push('/list');
			});
		}
		catch (err) {
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
							ref={nameInput}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<div className='item'>
					<div className='title'>내용</div>
					<div className='input'>
						<TextArea
							rows={4}
							placeholder='내용을 입력해 주세요.'
							style={{ resize: 'none' }}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>

				<div className='button'>
					<Button onClick={onInsert} disabled={!title || !description ? true : false}>게시</Button>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; max-width: 800px; min-width: 600px; width: 80%; }
			.item { margin: 10px 0; display: flex; align-items: center; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	)
};

export default React.memo(InsertPage);

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