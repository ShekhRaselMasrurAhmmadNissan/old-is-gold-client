import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';

const AllProducts = () => {
	const products = useLoaderData();
	const navigation = useNavigation();
	if (navigation.state === 'loading') {
		return <Loading />;
	}
	return (
		<div>
			{products.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th></th>
								<th>Picture</th>
								<th>Name</th>
								<th>Email</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => (
								<tr key={product._id}>
									<th>{index + 1}</th>
									<td>
										<img
											src={product.productImage}
											alt=""
											className="h-10 w-10 rounded-full"
										/>
									</td>
									<td>{product.productName}</td>
									<td>{product.categoryName}</td>
									<td>
										{product.sold ? 'Sold' : 'Available'}
									</td>
									<td></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className="text-center font-medium text-blue-500 italic text-2xl mt-8">
					Sorry No product to show.
				</p>
			)}
		</div>
	);
};

export default AllProducts;
