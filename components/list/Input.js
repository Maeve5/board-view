import React, { useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

function ListInput({ result }) {

	const [title, setTitle] = useState(result.title);
	const [description, setDescription] = useState(result.description);
	const [readOnly, setReadOnly] = useState(true);

	// 조회
	// if ( ) {
	// 	setReadOnly(true);
	// }


	// const onChange = (e) => {
	// 	setTitle(e.target.value);
	// };


	return (
		<>
			<div className='item'>
				<div className='title'>제목</div>
				<div className='input'>
					<Input
						type='text'
						placeholder='제목을 입력해 주세요.'
						style={{ display: 'block' }}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						readOnly={readOnly}
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
						readOnly={readOnly}
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

export default React.memo(ListInput);