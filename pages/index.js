
function Home() {
  return (
    <div>

    </div>
  )
};

export default React.memo(Home);

// export const getServerSideProps = async () => {
// 	try {
// 		const res = await API.get('/v1/shop/product');
// 		console.log('res >> ', res.data.dataSet);
// 		const data = await res.data.dataSet;
// 		return { props : { data }}
// 	}
// 	catch (e) {
// 		console.log('e >> ', e);
// 		return { props : {}}
// 	}
// };