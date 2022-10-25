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
			const data = API.get('v1/list');
			dispatch({ type: 'SUCCESS', data: prevData});
		} catch (e) {
			dispatch({ type: 'ERROR', data: e });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, method, headers]);

	return [state.state, state.data, fetchData];
}

export default useAsync;