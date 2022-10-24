import Head from 'next/head'
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import '../styles/globals.css'
import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';
import Spinner from '../components/global/Spinner';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				
				<title>게시판</title>

				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<meta property="og:title" content="BOARD" />

			</Head>
			
			<RecoilRoot>
				<ConfigProvider locale={koKR}>
					<Spinner/>
					<Component {...pageProps} />
				</ConfigProvider>
			</RecoilRoot>
		</>
	)
}

export default MyApp
