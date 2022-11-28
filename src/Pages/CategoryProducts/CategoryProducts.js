import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';
import ProductsCards from '../../Components/Shared/ProductsCards/ProductsCards';

const CategoryProducts = () => {
	const products = useLoaderData();

	const navigation = useNavigation();
	if (navigation.state === 'loading') {
		return <Loading />;
	}

	return (
		<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-4">
			<h2 className="text-3xl text-center font-medium text-">Books</h2>
			{products.length > 0 ? (
				<ProductsCards products={products} />
			) : (
				<h2 className="text-2xl text-center font-medium text-blue-500 italic">
					No Products to show.
				</h2>
			)}
		</div>
	);
};

export default CategoryProducts;
