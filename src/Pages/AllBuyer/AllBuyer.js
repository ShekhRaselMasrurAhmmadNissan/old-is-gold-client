import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const AllBuyer = () => {
	const { user } = useContext(AuthContext);
	const {
		data: allBuyer,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['allBuyer'],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/users/allBuyer?email=${user?.email}`,
					{
						headers: {
							authorization: `bearer ${localStorage.getItem(
								'old-is-gold-token'
							)}`,
						},
					}
				);
				return response.data;
			} catch (error) {
				if (
					error.response.status === 401 ||
					error.response.status === 403
				) {
					toast.error('Unauthorized Access');
					// logOut().catch((err) => console.error(err));
				}
			}
		},
	});

	return (
		<div className="mt-8 bg-gray-100 pt-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				All Buyer
			</h1>
			{isError ? (
				<p className="text-2xl font-medium text-red-600">
					Sorry..!!! Something went wrong.
					<span className="italic underline">{error}</span>
				</p>
			) : isLoading ? (
				<Loading />
			) : allBuyer.length > 0 ? (
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
							{allBuyer.map((Buyer, index) => (
								<tr key={Buyer._id}>
									<th>{index + 1}</th>
									<td>{Buyer.name}</td>
									<td>{Buyer.email}</td>
									<td>
										<img
											src={Buyer.image}
											alt=""
											className="h-10 w-10 rounded-full"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className="text-center font-medium text-blue-500 italic text-2xl mt-8">
					Sorry No Buyer to show.
				</p>
			)}
		</div>
	);
};

export default AllBuyer;
