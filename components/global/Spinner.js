import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { router } from 'next/router';
import spinState from '../../atom/spinState';
import { Spin } from 'antd';

function Spinner({ children }) {

	const [isSpin, setIsSpin] = useRecoilState(spinState);

	useEffect(() => {
		console.log(isSpin);
        router.events.on('routeChangeStart', (path) => {
            setIsSpin(true);
        });
        router.events.on('routeChangeComplete', (path) => {
            setIsSpin(false);
        });
        router.events.on('routeChangeError', (path) => {
            setIsSpin(false);
        });
    }, [isSpin]);

	return (
		<>
			{isSpin ?
				<div className='contentWrap'>
					<Spin style={{ display: 'block', margin: '50vh auto' }} tip='Loading...' />
					{/* <Spin /> */}
				</div>
			: <>{children}</>}

			<style jsx>{`

			`}</style>
		</>
	);
}

export default React.memo(Spinner);