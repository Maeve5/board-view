import React, { useCallback } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Input, Button } from 'antd';
const { TextArea } = Input;

function ListKey({ success, result, listKey }) {

	// 존재하지 않는 페이지
	// if (!success) {
	// 	alert('존재하지 않는 게시물입니다.');
	// 	return false;
	// }

	// 수정 페이지 이동
	const SendQuery = useCallback (() => {
		router.push({
			pathname: '/list/update',
			query: { title: result.title, description: result.description, listKey: listKey },
		}, `/list/update/${listKey}`);
	}, []);

	// 삭제
	const onDelete = useCallback (async () => {
		
		try {
			await API.delete(`/v1/list/${listKey}`);
			router.push(`/list`);
		}
		catch (error) {
			console.log('onDelete 에러', error);
		}
	}, []);

	return (
		<>
			<TopHeader />

			<div className='insertpage'>
				<div className='item'>
					<div className='title'>제목</div>
					<div className='input'>
						<Input
							type='text'
							placeholder='제목을 입력해 주세요.'
							style={{ display: 'block' }}
							value={result ? result.title : null}
							readOnly={true}
							bordered={false}
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
							value={result ? result.description : null}
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

		// if ()
		const { success, result } = await res.data;
		console.log('result', res.data);
		let listKey = params.listKey;
		return { props: { success, result, listKey } }
	}
	catch (err) {
		// console.log('err', err.response.data);
		console.log('err', err);
		return { props : { success: false }}
	}
}