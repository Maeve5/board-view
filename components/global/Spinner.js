import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import spinState from '../../atom/spinState';
import { Spin } from 'antd';

function Spinner() {

	const [isSpin, setIsSpin] = useRecoilState(spinState);

	useEffect(() => {
		console.log('isSpin', isSpin);
	}, [isSpin]);

	return (
		<>
			{isSpin ?
				<div className='contentWrap'>
					<Spin />
				</div>
			: <></>}
		</>
	);
}

export default React.memo(Spinner);