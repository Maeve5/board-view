import React from "react";
import { router } from "next/router";

function Home() {
	return (
		<div style={{ display: 'block', margin: '300px', textAlign: 'center' }}>
			<input type="button" value='게시판' onClick={() => router.push('/list')} />
		</div>
	)
};

export default React.memo(Home);