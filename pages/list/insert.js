import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import { server } from '../../modules/server';
import { Input, Button } from 'antd';
import API from '../../modules/api';
import { AXIOS } from '../../modules/axios';
const { TextArea } = Input;

function InsertPage({ success, isLogin, user }) {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const token = user.token;

	// 데이터 추가
	const onInsert = useCallback(async () => {

		if (!title || !description) {
			alert('빈칸이 있습니다.');
			return false;
		}

		try {
			// AXIOS(`/v1/list`, 'post', token, {
			// 	title: title,
			// 	description: description,
			// 	userKey: user.userKey,
			// }).then((response) => {
			// 	alert(`[${response.errCode}]\n${response.message}`);
				// [500] 게시글 등록에 문제가 있습니다. 관리자에게 문의해주세요.
				// router.push('/list')
			// });
			API.defaults.headers.common['Authorization'] = user.token;
			await API.post(`/v1/list`, {
				title: title,
				description: description,
				userKey: user.userKey,
			});
			router.push('/list');
		}
		catch (err) {
			console.log('onInsert 에러', err);
		}		
	}, [title, description]);

	return (
		<>
			<TopHeader user={user} />

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
							rows={4}
							placeholder='내용을 입력해 주세요.'
							style={{ resize: 'none' }}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>

				<div className='button'>
					<Button onClick={onInsert}>게시</Button>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; max-width: 800px; width: 80%; }
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