import React from "react";
import { router } from "next/router";

function Custom500() {
	return (
		<div style={{ display: 'block', margin: '300px', textAlign: 'center' }}>
			500
		</div>
	)
};

export default React.memo(Custom500);