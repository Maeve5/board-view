import React, { useState, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Button, Pagination } from 'antd';
import Posts from '../../components/list/Posts';

function ListPage({ result }) {

	// let listArr = result.slice((page-1)*pageSize, pageSize);
	// console.log('listArr', listArr);
	// console.log('result', result);

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(5);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			setPosts(result);
			setLoading(false);
		}

		fetchPosts();
	}, []);

	const lastPost = page * pageSize;
	const firstPost = lastPost - pageSize;
	const postArr = posts.slice(firstPost, lastPost);


	return (
		<>
			{/* 헤더 */}
			<TopHeader />

			<div className='list'>
				<div className='button' style={{ float: 'right', margin: '0 20px 10px 0' }}>
					<Button onClick={() => router.push('/list/insert')}>글쓰기</Button>
				</div>

				{/* 게시글 목록 */}
				<Posts postArr={postArr} firstPost={firstPost} loading={loading} />

				<div className='pagination'>
					<Pagination defaultCurrent={page} onChange={(e) => setPage(e)} pageSize={pageSize} total={result.length} />
				</div>
			</div>

			<style jsx>{`
			.list { margin: 100px auto; max-width: 800px; width: 80%; }
			.pagination { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(ListPage);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/list');
		console.log('res', res);
		const { result } = await res.data;
		return { props : { result }}
	}
	catch (err) {
		console.log('err', err);
		return { props : { result: [] }}
	}
}