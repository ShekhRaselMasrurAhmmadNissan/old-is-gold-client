import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import ProductInformation from '../ProductInformation/ProductInformation';

const ProductsCards = ({ products }) => {
	const [orderProduct, setOrderProduct] = useState(null);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center">
				{products.map((product) => (
					<ProductInformation
						key={product._id}
						product={product}
						orderProduct={orderProduct}
						setOrderProduct={setOrderProduct}
					/>
				))}
			</div>
			{orderProduct && (
				<BookingModal
					orderProduct={orderProduct}
					setOrderProduct={setOrderProduct}
				/>
			)}
		</>
	);
};

export default ProductsCards;
