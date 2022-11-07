import React, { useState, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import { Button, Pagination } from 'antd';
import Posts from '../../components/list/Posts';
import { server } from '../../modules/server';

function ListPage({ success, isLogin, user, result }) {

	// 페이지네이션
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	// 현재 페이지
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize] = useState(10);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			setPosts(result);
			setLoading(false);
		}

		fetchPosts();
	}, []);

	const lastPost = currentPage * pageSize;
	const firstPost = lastPost - pageSize;
	const postArr = posts.slice(firstPost, lastPost);

	return (
		<>
			{/* 헤더 */}
			<TopHeader user={user} isLogin={isLogin} />

			<div className='list'>
				<div className='button' style={{ float: 'right', margin: '0 20px 10px 0' }}>
					<Button onClick={() => router.push('/list/insert')}>글쓰기</Button>
				</div>

				{/* 게시글 목록 */}
				<div style={{ display: 'block', textAlign: 'center' }}>
					<Posts postArr={postArr} firstPost={firstPost} loading={loading} />
				</div>

				<div className='pagination'>
					<Pagination defaultCurrent={currentPage} onChange={(e) => setCurrentPage(e)} pageSize={pageSize} total={result.length} />
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
		let init = await server({ req });
		const { success, isLogin, user, result } = init;
		
		return { props: { success, isLogin, user, result }};
	}
	catch (err) {
		return console.log(err);
	}
};