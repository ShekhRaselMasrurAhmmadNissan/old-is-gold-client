import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../Components/Shared/Loading/Loading';

const AllSeller = () => {
	const {
		data: allSeller,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['allSeller'],
		queryFn: async () => {
			const response = await axios.get(
				`http://localhost:5000/users/allSeller`
			);
			return response.data;
		},
	});

	return (
		<div className="mt-8 bg-gray-100 pt-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				All Seller
			</h1>
			{isError ? (
				<p className="text-2xl font-medium text-red-600">
					Sorry..!!! Something went wrong.
					<span className="italic underline">{error}</span>
				</p>
			) : isLoading ? (
				<Loading />
			) : (
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>email</th>
								<th>Picture</th>
							</tr>
						</thead>
						<tbody>
							{allSeller.map((seller, index) => (
								<tr key={seller._id}>
									<th>{index + 1}</th>
									<td>{seller.name}</td>
									<td>{seller.email}</td>
									<td>
										<img
											src={seller.image}
											alt=""
											className="h-10 w-10 rounded-full"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default AllSeller;
