import React from 'react';
import Link from 'next/link';
import { Spin } from 'antd';

function Posts({ postArr, firstPost, loading }) {

	if (loading) {
		return <Spin style={{margin: '0 auto'}} tip="Loading..." />
	}

	return (
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
				{postArr.length === 0 ?
					<tr>
						<td colSpan='4' height='100' className='no-list'>등록된 게시글이 없습니다.</td>
					</tr> :
					postArr.map((row, idx) => {
						return (
							<tr key={row.rowKey} className='td'>
								<td width='8%'>{idx + firstPost + 1}</td>
								<td width='55%'>
									<Link href={`/list/${row.rowKey}`}>
										<a style={{ color: 'black' }}>{row.title}</a>
									</Link>
								</td>
								<td width='17%'>{row.name}</td>
								<td width='20%'>{row.time}</td>
							</tr>
						)
					})
				}
			</tbody>

			<style jsx>{`
			.container { margin-bottom: 20px; max-width: 800px; width: 100%; }
			thead, tbody { border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
			.no-list { text-align: center; }
			.td { text-align: center; }
			`}</style>
		</table>
	);
};

export default React.memo(Posts);