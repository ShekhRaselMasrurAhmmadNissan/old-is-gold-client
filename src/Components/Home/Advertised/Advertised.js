import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import ProductInformation from '../../Shared/ProductInformation/ProductInformation';
import ProductsCards from '../../Shared/ProductsCards/ProductsCards';
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
			<ProductsCards products={advertised} />
		</div>
	);
};

export default Advertised;
