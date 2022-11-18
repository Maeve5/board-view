import React, { useState, useEffect } from 'react';
import { router } from 'next/router';
import TopHeader from '../../components/global/TopHeader';
import Posts from '../../components/list/Posts';
import { server } from '../../modules/server';
import { Button, Pagination } from 'antd';

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
		};
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
					{!loading && <Posts postArr={postArr} firstPost={firstPost} />}
				</div>

				<div className='pagination'>
					<Pagination defaultCurrent={currentPage} onChange={(e) => setCurrentPage(e)} pageSize={pageSize} total={result ? result.length : 0} />
				</div>
			</div>

			<style jsx>{`
			.list { margin: 100px auto; max-width: 800px; min-width: 600px; width: 80%; }
			.pagination { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</>
	);
};

export default React.memo(ListPage);

export const getServerSideProps = async ({ req, res }) => {
	console.log(req.cookies);
	try {
		let init = await server({ req });
		const { success, isLogin, user, result } = init;
		return { props: { success, isLogin, user, result }};
	}
	catch (err) {
		let error = {};
		if (err.response?.status === 500 || err.code === 'ECONNREFUSED' || 'ECONNRESET' || 'ERR_BAD_RESPONSE') {
			error = {
				redirect: {
					permanent: false,
					destination: '/500'
				}
			}
		}
		else {
			error = {
				redirect: {
					permanent: false,
					destination: '/404'
				}
			}
		}
		return error;
	}
};