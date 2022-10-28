import { RecoilRoot } from 'recoil';
import Head from 'next/head'
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>게시판</title>

				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			
			<RecoilRoot>
				<ConfigProvider locale={koKR}>
					<Component {...pageProps} />
				</ConfigProvider>
			</RecoilRoot>
		</>
	)
}

export default MyApp
