import React, { useState } from 'react';
import { useRouter } from 'next/router'
import TopHeader from '../../components/global/TopHeader';
import { Input, Button, Divider } from 'antd';
const { TextArea } = Input;

function Update() {
	
	const router = useRouter().query;
	console.log('query', router);
	
	const [title, setTitle] = useState(router.title);
	const [description, setDescription] = useState(router.description);
	
	const onUpdate = async () => {
		await API.patch(`/v1/list/update/${path}`, {
			title: title,
			description: description
		});
		console.log('수정', result);
	}

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