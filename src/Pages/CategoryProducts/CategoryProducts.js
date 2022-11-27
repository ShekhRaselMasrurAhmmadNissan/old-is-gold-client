import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';

const CategoryProducts = () => {
	const products = useLoaderData();

	const navigation = useNavigation();
	if (navigation.state === 'loading') {
		return <Loading />;
	}

	return (
		<div>
			<h2>This is Category Products. Total Product: {products.length}</h2>
		</div>
	);
};

export default CategoryProducts;
