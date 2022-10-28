import React, { useCallback } from 'react';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Input, Button, Divider } from 'antd';
import { router } from 'next/router';
import ListInput from '../../components/list/Input';
import Update from '../../components/list/Update';
const { TextArea } = Input;

function ListKey({ success, result, path }) {

	// 수정
	const SendQuery = () => {
		router.push({
			pathname: '/list/update',
			query: { title: result.title, description: result.description, patchKey: path },
		}, `/list/update/${path}`);
	};

	// 삭제
	const onDelete = useCallback (async () => {
		try {
			const res = await API.delete(`/v1/list/${path}`);
			if (res.status === 200) {
			router.push(`/list`);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<TopHeader></TopHeader>
			<div className='insertpage'>
				{/* <div className='input'>
					<div className='title'>제목</div>
					<div className='text'>
						<Input type='text' placeholder='제목을 입력해 주세요.' style={{ display: 'block' }} value={result.title} readOnly />
					</div>
				</div>
				<div className='input'>
					<div className='title'>내용</div>
					<div className='text'>
						<TextArea rows={4} placeholder='내용을 입력해 주세요.' value={result.description} readOnly />
					</div>
				</div> */}
				{/* <ListInput result={result} /> */}
				<div className='item'>
					<div className='title'>제목</div>
					{/* <Divider type="vertical" style={{ borderColor: '#999', height: '2vh' }} /> */}
					<div className='input'>
						<Input
							type='text'
							placeholder='제목을 입력해 주세요.'
							style={{ display: 'block' }}
							value={result.title}
							readOnly={true}
							bordered={false}
						/>
					</div>
				</div>
				<div className='item'>
					<div className='title'>내용</div>
					{/* <Divider type="vertical" style={{ borderColor: '#999', height: '100' }} /> */}
					<div className='input'>
						<TextArea
							rows={4}
							placeholder='내용을 입력해 주세요.'
							style={{ resize: 'none' }}
							value={result.description}
							readOnly={true}
							bordered={false}
						/>
					</div>
				</div>
				<div className='button'>
					<Button
						onClick={SendQuery}>수정</Button>
					<Button onClick={onDelete}>삭제</Button>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; max-width: 800px; width: 80%; }
			.item { margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(ListKey);

export const getServerSideProps = async ({ params }) => {
	try {
		const res = await API.get(`/v1/list/${params.listKey}`);
		console.log('params', params);
		const { success, result } = await res.data;
		let path = params.listKey;
		// console.log('path', path );
		return { props: { success, result, path } }
	}
	catch (err) {
		console.log('err', err);
	}
}