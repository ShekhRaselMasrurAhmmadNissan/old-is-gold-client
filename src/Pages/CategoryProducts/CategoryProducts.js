import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';
import ProductInformation from '../../Components/Shared/ProductInformation/ProductInformation';

const CategoryProducts = () => {
	const products = useLoaderData();

	const navigation = useNavigation();
	if (navigation.state === 'loading') {
		return <Loading />;
	}

	return (
		<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-4">
			<h2 className="text-3xl text-center font-medium text-">Products</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-center">
				{products.map((product) => (
					<ProductInformation key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default CategoryProducts;
