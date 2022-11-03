import React, { useState, useCallback } from 'react';
import { router, useRouter } from 'next/router';
import TopHeader from '../../../components/global/TopHeader';
import API from '../../../modules/api';
import axios from "axios";
import { server } from '../../../modules/server';
import { Input, Button } from 'antd';
const { TextArea } = Input;

function Update({ req, success, user, result, listKey }) {
	console.log('user', user);
	
	// const query = useRouter().query;
	// query: { title, description, listKey }
	
	const [title, setTitle] = useState(result.title);
	const [description, setDescription] = useState(result.description);

	const onUpdate = useCallback (async () => {

		if ( !title || !description ) {
			alert('빈칸이 있습니다.');
			return false;
		}

		try {
			await axios({
				url: `/v1/list/${listKey}`,
				method: 'patch',
				data: {
					title: title,
					description: description
				},
				baseURL: 'http://localhost:8082',
				headers: {
					'Authorization': user.token,
					'Accept': 'Application/json',
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			});
			// await API.patch(`/v1/list/${query.listKey}`, {
			// 	title: title,
			// 	description: description
			// },
			// {headers: {
			// 	'Authorization': req.cookies.cookie ? req.cookies.cookie : '',
			// 	'Accept': 'Application/json',
			// 	'Content-Type': 'application/json',
			// }}
			// );
			router.push(`/list/${listKey}`);
		}
		catch (error) {
			console.log('onUpdate 에러', error);
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
					<Button	onClick={onUpdate}>수정</Button>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; max-width: 800px; width: 80%; }
			.item { margin: 10px 0; display: flex; align-items: center; justify-content: center; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	)
}

export default React.memo(Update);

export const getServerSideProps = async ({ req, params }) => {
	console.log('req', req);
	let listKey = params.listKey;
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