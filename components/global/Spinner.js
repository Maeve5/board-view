import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { router } from 'next/router';
import spinState from '../../atom/spinState';
import { Spin } from 'antd';

function Spinner({ children }) {

	const [isSpin, setIsSpin] = useRecoilState(spinState);

	useEffect(() => {
		// 페이지 변경 시작
        router.events.on('routeChangeStart', () => setIsSpin(true));
		// 페이지 변경 완료
        router.events.on('routeChangeComplete', () => setIsSpin(false));
		// 페이지 에러
        router.events.on('routeChangeError', () => setIsSpin(false));
    }, [isSpin]);

	return (
		<>
			{isSpin ?
				<div className='contentWrap'>
					<Spin style={{ display: 'block', margin: '50vh auto' }} tip='Loading...' />
				</div>
			: <>{children}</>}

			<style jsx>{`

			`}</style>
		</>
	);
}

export default React.memo(Spinner);