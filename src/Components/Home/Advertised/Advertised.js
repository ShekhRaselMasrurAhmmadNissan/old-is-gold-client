import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ProductInformation from '../../Shared/ProductInformation/ProductInformation';
import SmallSpinner from '../../Shared/SmallSpinner/SmallSpinner';

const Advertised = () => {
	const {
		data: advertised,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['advertised'],
		queryFn: async () => {
			const response = await axios.get(
				`http://localhost:5000/advertised`
			);
			console.log(response.data);
			return response.data;
		},
	});

	console.log(advertised);

	if (isLoading) {
		return <SmallSpinner />;
	}

	if (advertised.length === 0) {
		return <></>;
	}

	return (
		<div className="mt-8 bg-gray-100 py-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				Advertised Products
			</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-center m-2">
				{advertised.map((product) => (
					<ProductInformation key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Advertised;
