import React from 'react';

const ListPage = ({ data }) => {


	return (
		<div>
			{data === 'string' ? 
				data :
				data.map((row) => {
					return (
						<div key={row.listkey}>
							{row.title}
						</div>
					)
				})
			}
		</div>
	);
};

export default ListPage;

// export const getServerSideProps = async () => {
// 	const init = await 
// }