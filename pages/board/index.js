import React from 'react';
import { useMemo } from 'react';

const ListPage = ({ success, result }) => {

	return (
		<>
			<div className=''>
				<table className='table' border='1'>
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
							result.map((row) => {
								return (
									<tr key={row.listkey} className='td'>
										<td width='8%'>{row.listkey}</td>
										<td width='55%'>{row.title}</td>
										<td width='17%'>{row.nickname}</td>
										<td width='20%'>{row.date} {row.time}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>

			<style jsx>{`
			.table { border: 1px solid #eee; margin: 100px auto; max-width: 800px; width: 80%; }
			.no-list { text-align: center; }
			.td { text-align: center; }
			`}</style>
		</>
	);
};

export default ListPage;

// export const getServerSideProps = async () => {
// 	const init = await 
// }