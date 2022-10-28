import { Input, Button } from 'antd';
import React, { useState, useCallback } from 'react';
import { router, useRouter } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
const { TextArea } = Input;

function InsertPage() {

	// const listKey = useRouter().query.listKey;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	
	const onInsert = useCallback( async () => {
		try {
			const res = await API.post(`/v1/list`, {
				title: title,
				description: description,
				name: 'name1',
				userKey: '1'
			});
			if (res.status === 200) {
			router.push('/list');
			}
		} catch (error) {
			console.log(error);
		}
	}, [title, description]);

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
}

export default React.memo(InsertPage);