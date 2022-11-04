import React, { useState, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import API from '../../modules/api';
import { Button, Pagination } from 'antd';
import Posts from '../../components/list/Posts';
import { server } from '../../modules/server';
import { useRecoilState } from 'recoil';
import spinState from '../../atom/spinState';

function ListPage({ success, user, result }) {
	const [isSpin, setIsSpin] = useRecoilState(spinState);

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);

	useEffect(() => {
	// 	setIsSpin(true);
		
	// 	if (success) {
	// 		setPosts(result);
	// 		setIsSpin(false);
	// 	}
	// 	else {
	// 		setIsSpin(true);
	// 	}
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
			<TopHeader user={user} />

			<div className='list'>
				<div className='button' style={{ float: 'right', margin: '0 20px 10px 0' }}>
					<Button onClick={() => router.push('/list/insert')}>글쓰기</Button>
				</div>

				{/* 게시글 목록 */}
				<div style={{ display: 'block', textAlign: 'center' }}>
					<Posts postArr={postArr} firstPost={firstPost} loading={loading} />
				</div>

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

export const getServerSideProps = async ({ req }) => {

	try {
		const method = 'get';
		const uri = `/v1/list`;
		let init = await server({ req, method, uri });
		const { success, isLogin, user, result } = init;
		
		return { props: { success, user, result }};
	}
	catch (err) {
		return result
	}
};