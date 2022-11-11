import React, { useState, useCallback } from 'react';
import { router } from 'next/router';
import { AXIOS } from '../../modules/axios';
import { Button, Input, Modal } from 'antd';
const { TextArea } = Input;

function Post({ user, result, listKey }) {

	// 삭제 확인 모달
	const [isModalOpen, setIsModalOpen] = useState(false);
	// 게시글 삭제
	const onDelete = useCallback(async () => {
		try {
			const token = user.token;
			await AXIOS(`/v1/list/${listKey}`, 'delete', token)
			.then((response) => {
				Modal.info({
					title: '알림',
					content: '삭제되었습니다.'
				});
				router.push(`/list`);
			});
		}
		catch (error) {
			Modal.error({
				title: '오류',
				content: '오류가 발생했습니다.\n관리자에게 문의해주세요.',
			});
		}
	}, []);

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

			{/* 작성자일 때 */}
			{result.userKey === user.userKey ?
				<div className='button'>
					<Button style={{ marginRight: '5px' }} onClick={() => router.push(`/list/update/${listKey}`)}>수정</Button>
					<Button onClick={() => setIsModalOpen(true)}>삭제</Button>
				</div>
				: ''
			}

			{/* 삭제 확인 모달 */}
			<Modal title='알림' open={isModalOpen} onOk={onDelete} onCancel={() => setIsModalOpen(false)}>
				<p>삭제하시겠습니까?</p>
			</Modal>

			<style jsx>{`
			.insertpage { margin: 100px auto; margin-bottom: 20px; max-width: 800px; min-width: 600px; width: 80%; }

			.item-container { display: inline-flex; justify-content: space-between; max-width: 800px; width: 100%; }
			.item1 { flex: 1; max-width: 400px; margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title1 { flex: 1; text-align: center; }
			.input1 { flex: 3.5; }
			
			.item { margin: 10px 0; display: flex; align-items: center; justify-content: center; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
			.title { flex: 1; text-align: center; }
			.input { flex: 8; }

			.button { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</div>
	);
};

export default React.memo(Post);