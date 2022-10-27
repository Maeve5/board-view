import React, { useState } from 'react';
import TopHeader from "../global/TopHeader";
import API from '../../modules/api';
import { Input } from 'antd';
const { TextArea } = Input;

function Update({ result }) {
	const [title, setTitle] = useState(result.title);
	const [description, setDescription] = useState(result.description);

	return (
		<>
			<TopHeader />
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
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>

			<style jsx>{`
			.item { margin: 10px 0; display: flex; align-items: center; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			`}</style>
		</>
	);
};

export default React.memo(Update);

// export const getServerSideProps = async ({ params }) => {
// 	try {
// 		console.log('params', params.listKey );
// 		const res = await API.get(`/v1/list/${params.listKey}`);
// 		console.log('res', res.data);
// 		const { success, result } = await res.data;
// 		return { props : { success, result }}
// 	}
// 	catch (err) {
// 		console.log('err', err);
// 	}
// }