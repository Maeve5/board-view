import React from "react";
import { router } from "next/router";

function Custom404() {
	return (
		<div style={{ display: 'block', margin: '300px', textAlign: 'center' }}>
			404
		</div>
	)
};

export default React.memo(Custom404);