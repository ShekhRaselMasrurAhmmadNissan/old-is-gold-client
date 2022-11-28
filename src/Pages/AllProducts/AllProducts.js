import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading/Loading';

const AllProducts = () => {
	const { email } = useParams();

	const {
		data: products,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const response = await axios.get(
				`http://localhost:5000/products/${email}`
			);
			return response.data;
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	const handleAdvertise = async (id) => {
		console.log('Advertised', id);
		try {
			const advertisedProduct = await axios.patch(
				`http://localhost:5000/products/advertised/${id}`
			);
			console.log(advertisedProduct.data);
			toast.success('Product Advertised Successfully.');
			refetch();
		} catch (error) {
			console.error(error);
			toast.error('Something Went wrong. Failed to advertise.');
		}
	};

	const handleDelete = async (id) => {
		console.log('Deleted', id);
	};

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
									<td>
										{!product.sold && !product.advertised && (
											<button
												className="px-2 py-1 rounded-md text-white font-medium bg-blue-500 mr-2"
												onClick={() =>
													handleAdvertise(product._id)
												}
											>
												Advertise
											</button>
										)}
										{!product.sold && (
											<button
												className="px-2 py-1 rounded-md text-white font-medium bg-red-500"
												onClick={() =>
													handleDelete(product._id)
												}
											>
												Delete
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

export default AllProducts;
