import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const MyOrders = () => {
	const { user } = useContext(AuthContext);

	const {
		data: orders,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const response = await axios.get(
				`http://localhost:5000/orders?email=${user?.email}`
			);
			return response.data;
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			{orders.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th></th>
								<th>Product Name</th>
								<th>Price</th>
								<th>seller Name</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order, index) => (
								<tr key={order._id}>
									<th>{index + 1}</th>
									<td>{order.productName}</td>
									<td>{order.resalePrice}</td>
									<td>{order.sellerName}</td>
									<td>
										{order.sold ? (
											'Sold'
										) : (
											<button className="px-2 py-1 rounded-md text-white font-medium bg-blue-500 mr-2">
												Pay
											</button>
										)}
									</td>
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

export default MyOrders;
