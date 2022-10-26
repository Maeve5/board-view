import { useCallback, useReducer, useState, useEffect } from 'react';
import API from '../modules/api';
import { Modal } from 'antd';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				state: 'loading',
				data: action.data,
			};
		case 'SUCCESS':
			return {
				state: 'success',
				data: action.data,
			};
		case 'ERROR':
			return {
				state: 'error',
				data: action.data
			};
		default:
			return {
				state: 'default',
				data: null,
			};
	}
}

const useAsync = (
	// Props
	method,
	url,
	headers,
) => {

	// reducer
	const [state, dispatch] = useReducer(reducer, {
		state: 'done',
		data: null
	});

	const [prevData, setPrevData] = useState([]);

	// 데이터 조회
	const fetchData = useCallback((_params) => {
		dispatch({ type: 'LOADING', data: prevData });
		try {
			// Axios 객체 생성
			const baseURL = apiUrl;
			const defaultClient = axios.create({
				baseURL,
				headers: headers ? headers : {
					'Accept': 'application/json',
					'Content-Type': 'application/json; charset=utf-8',
					'Cache': 'no-cache',
				},
				params: ['get', 'delete'].includes(method) ? _params : null,
			});
			// defaultClient.defaults.params = params 
			// Time Out 설정
			defaultClient.defaults.timeout = 30000;
			// withCredentials 설정
			defaultClient.defaults.withCredentials = true;
			// axios 실행
			if (method !== 'form') {
				defaultClient[method](url, ['post', 'patch', 'put'].includes(method) ? _params : null)
					.then(function (response) {
						setPrevData(() => response?.data);
						dispatch({ type: 'SUCCESS', data: response?.data });
					})
					.catch(function (error) {
						if (error.response) {
							if (error.response.status === 500) {
								Modal.error({
									title: '오류',
									content: '작업중 오류가 생겼어요..\n관리자에게 문의해주세요.',
								});
							}
							else {
								Modal.warning({
									title: '경고',
									content: error.response.data?.message,
								});
							}
							dispatch({ type: 'ERROR', data: error.response?.data });
						} else {
							Modal.error({
								title: '오류',
								content: '네트워크 연결이 불안정해요.\n잠시후 다시 시도해주세요.',
							});
							dispatch({ type: 'ERROR', data: { message: '네트워크 연결이 불안정해요.\n잠시후 다시 시도해주세요.' } });
						}
					});
			} else {
				defaultClient.post(url, _params ? _params : null, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
						'Cache': 'no-cache'
					}
				})
					.then(function (response) {
						setPrevData(() => response?.data);
						dispatch({ type: 'SUCCESS', data: response?.data });
					})
					.catch(function (error) {
						if (error.response) {
							if (error.response.status === 500) {
								Modal.error({
									title: '오류',
									content: '작업중 오류가 생겼어요..\n관리자에게 문의해주세요.',
								});
							}
							else {
								Modal.warning({
									title: '경고',
									content: error.response.data?.message,
								});
							}
							dispatch({ type: 'ERROR', data: error.response?.data });
						} else {
							Modal.error({
								title: '오류',
								content: '네트워크 연결이 불안정해요.\n잠시후 다시 시도해주세요.',
							});
							dispatch({ type: 'ERROR', data: { message: '네트워크 연결이 불안정해요.\n잠시후 다시 시도해주세요.' } });
						}
					});
			}
		} catch (e) {
			dispatch({ type: 'ERROR', data: e });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, method, headers]);

	return [state.state, state.data, fetchData];
}

export default useAsync;