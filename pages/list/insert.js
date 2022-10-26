import { Input, Button } from 'antd';
import React from 'react';
import TopHeader from '../../components/global/TopHeader';
const { TextArea } = Input;

function InsertPage() {
	return (
		<>
			<TopHeader></TopHeader>
			<div className='insertpage'>
				<div className='input'>
					<div className='title'>제목</div>
					<div className='text'>
						<Input type='text' placeholder='제목을 입력해 주세요.' style={{ display: 'block' }} />
					</div>
				</div>
				<div className='input'>
					<div className='title'>내용</div>
					<div className='text'>
						<TextArea rows={4} placeholder='내용을 입력해 주세요.' />
					</div>
				</div>
				<div className='button'>
					<Button>게시</Button>
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
	)
}

export default React.memo(InsertPage);