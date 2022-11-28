import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const ReportedProducts = () => {
	const { user } = useContext(AuthContext);

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
				`https://old-is-gold-server-pi.vercel.app/reported`
			);
			console.log(response);
			return response.data;
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	const handleDelete = async (id) => {
		console.log('Deleted', id);
		try {
			const deleteProduct = await axios.delete(
				`https://old-is-gold-server-pi.vercel.app/products/${id}?email=${user?.email}`,
				{
					headers: {
						authorization: `bearer ${localStorage.getItem(
							'old-is-gold-token'
						)}`,
					},
				}
			);
			console.log(deleteProduct.data);
			toast.success('Product Deleted Successfully.');
			refetch();
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.status === 403
			) {
				toast.error('Unauthorized Access');
				// logOut().catch((err) => console.error(err));
			}
			toast.error('Something Went wrong. Failed to Delete.');
		}
	};

	return (
		<div>
			{products?.length > 0 ? (
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
										<button
											className="px-2 py-1 rounded-md text-white font-medium bg-red-500"
											onClick={() =>
												handleDelete(product._id)
											}
										>
											Delete
										</button>
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

export default ReportedProducts;
