import React from "react";
import TopHeader from "../components/global/TopHeader";
import API from '../modules/api';
import List from './list/index';

function Home({ success, result }) {
  return (
    <>
      <TopHeader></TopHeader>
      <div>
        <List success={success} result={result} />
      </div>
    </>
  )
};

export default React.memo(Home);

// list 목록 불러와서 넘겨주면 위에서 리스트 받아서 화면 보여주기

export const getServerSideProps = async () => {
  try {
    const res = await API.get('/v1/list');
    console.log('res', res.data);
    const { success, result } = await res.data;
    return { props : { success, result }}
  } catch (err) {
    console.log('err', err);
  }
}