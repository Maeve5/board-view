import React from 'react';
import { Input, Spin } from 'antd';
const { TextArea } = Input;

function Post({ result }) {

	// if (loading) {
	// 	return <Spin style={{margin: '0 auto'}} tip="Loading..." />
	// }

	return (
		<div className='insertpage'>
			<div className='item-container'>
				<div className='item1'>
					<div className='title1'>제목</div>
					<div className='input1'>
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
				<div className='item1'>
					<div className='title1'>작성자</div>
					<div className='input1'>
						<Input
							type='text'
							style={{ display: 'block' }}
							value={result ? result.name : null}
							readOnly={true}
							bordered={false}
						/>
					</div>
				</div>
			</div>
			<div className='item'>
				<div className='title'>내용</div>
				<div className='input'>
					<TextArea
						placeholder='내용을 입력해 주세요.'
						style={{ minHeight: 285, resize: 'none' }}
						value={result ? result.description : null}
						readOnly={true}
						bordered={false}
					/>
				</div>
			</div>

			<style jsx>{`
			.insertpage { margin: 100px auto; margin-bottom: 20px; max-width: 800px; min-width: 600px; width: 80%; }

			.item-container { display: inline-flex; justify-content: space-between; max-width: 800px; width: 100%; }
			.item1 { flex: 1; max-width: 400px; margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title1 { flex: 1; text-align: center; }
			.input1 { flex: 3.5; }
			
			.item { margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }
			`}</style>
		</div>
	);
};

export default React.memo(Post);