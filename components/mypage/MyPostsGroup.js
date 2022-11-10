import React, { useState, useEffect, useCallback } from 'react';
import { router } from 'next/router';
import { AXIOS } from '../../modules/axios';
import MyPosts from './MyPosts';
import { Button, Pagination } from 'antd';

function MyPostsGroup({ user }) {
	
	// 페이지네이션
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	// 현재 페이지
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize] = useState(10);
	
	// 내가 쓴 글 조회
	useEffect(() => {
		const token = user.token;
		AXIOS(`/v1/user/${user.userKey}`, 'get', token)
		.then((response) => {
			setPosts(response);
		});
	}, []);

	const lastPost = currentPage * pageSize;
	const firstPost = lastPost - pageSize;
	const postArr = posts.slice(firstPost, lastPost);

	return (
		<div className='mypage'>
			<div className='list'>
				<div className='toptitle'>
					<h2>내가 쓴 글</h2>
				</div>

				{/* 내가 쓴 글 목록 */}
				<div style={{ display: 'block', textAlign: 'center' }}>
					<MyPosts postArr={postArr} firstPost={firstPost} loading={loading} />
				</div>

				<div className='pagination'>
					<Pagination defaultCurrent={currentPage} onChange={(e) => setCurrentPage(e)} pageSize={pageSize} total={posts.length} />
				</div>
			</div>

			<style jsx>{`
			.mypage { display: block; margin: 0 auto; }
			.list { margin: 10px auto; width: 80%; }
			.toptitle { display: block; padding-bottom: 10px; }
			.pagination { display: flex; align-items: center; justify-content: center; }
			`}</style>
		</div>
	)
};

export default React.memo(MyPostsGroup);