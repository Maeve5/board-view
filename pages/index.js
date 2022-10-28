import React from "react";
import { router } from "next/router";

function Home() {
	return (
		<>
			<input type="button" value='게시판' onClick={() => router.push('/list')} />
		</>
	)
};

export default React.memo(Home);