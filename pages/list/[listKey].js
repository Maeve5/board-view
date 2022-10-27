import React from 'react';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Input, Button } from 'antd';
import { router } from 'next/router';
import ListInput from '../../components/list/Input';
const { TextArea } = Input;

function listKey({ success, result }) {
	console.log('result', result);
	return (
		<>
			<TopHeader></TopHeader>
			<div className='insertpage'>
				<div className='input'>
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
				</div>
				{/* <ListInput result={result} /> */}
				<div className='button'>
					<Button onClick={() => router.push('/list/update')}>수정</Button>
					<Button>삭제</Button>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; max-width: 800px; width: 80%; }
			.input { margin: 10px 0; display: flex; align-items: center; }
			.title { flex: 1; text-align: center; }
			.text { flex: 8; }
			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(listKey);

export const getServerSideProps = async ({ params }) => {
	try {
		console.log('params', params.listKey );
		const res = await API.get(`/v1/list/${params.listKey}`);
		console.log('res', res.data);
		const { success, result } = await res.data;
		return { props : { success, result }}
	}
	catch (err) {
		console.log('err', err);
	}
}