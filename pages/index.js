import React from "react";
import Wrap from "../components/global/Wrap";
import API from '../modules/api';
import List from './board/index';

function Home({ data }) {
  return (
    <Wrap>
      <div>
        <h1>자유게시판</h1>
        <List data={data} />
      </div>
    </Wrap>
  )
};

export default React.memo(Home);

// list 목록 불러와서 넘겨주면 위에서 리스트 받아서 화면 보여주기

export const getServerSideProps = async () => {
  try {
    const res = await API.get('/test')
    console.log('res', typeof res.data);
    const data = res.data;
    return { props: { data } }
  } catch (err) {
    console.log('err', err);
  }
}