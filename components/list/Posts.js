import React, { useState } from 'react';

function Posts() {

	const [posts, setPosts] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const offset = (page -1) * limit;

	

	return (
		<div>
			
		</div>
	);
};

export default React.memo(Posts);