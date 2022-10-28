import { Button, Pagination } from 'antd';
import React from 'react';
import { router } from 'next/router';
import Link from 'next/link';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';

function ListPage({ result }) {

	const SendQuery = () => {
		router.push({
			pathname: '/list/insert',
			query: { listKey: result.length+1 }
		});
	};

	console.log('result', result);
	return (
		<>
			<TopHeader />
			<div className='list'>
				<div className='button' style={{ float: 'right', margin: '0 20px 5px 0' }}>
					<Button onClick={SendQuery}>글쓰기</Button>
				</div>
				<table className='container'>
					<thead>
						<tr className='th'>
							<th width='8%'>번호</th>
							<th width='55%'>제목</th>
							<th width='17%'>작성자</th>
							<th width='20%'>작성일</th>
						</tr>
					</thead>
					<tbody>
						{result.length === 0 ?
							<tr>
								<td colSpan='4' height='100' className='no-list'>등록된 게시글이 없습니다.</td>
							</tr> :
							result.map((row, idx) => {
								return (
									<tr key={row.rowKey} className='td'>
										<td width='8%'>{idx+1}</td>
										<td width='55%'>
											<Link href={`/list/${row.rowKey}`}>
												<a style={{ color: 'black' }}>{row.title}</a>
											</Link>
										</td>
										<td width='17%'>{row.name}</td>
										<td width='20%'>{row.date} {row.time}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<div className='pagination'>
					<Pagination defaultCurrent={1} total={50} />
				</div>
			</div>

			<style jsx>{`
			.list { margin: 100px auto; max-width: 800px; width: 80%; }
			.container { margin-bottom: 20px; max-width: 800px; width: 100%; }
			thead, tbody { border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
			.no-list { text-align: center; }
			.td { text-align: center; }
			.pagination { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(ListPage);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/list');
		// console.log('res', res.data);
		const { result } = await res.data;
		return { props : { result }}
	} catch (err) {
		console.log('err', err);
	}
}