import React from 'react';
import { FaRegGem } from 'react-icons/fa';

const ProductInformation = ({ product }) => {
	const {
		_id,
		productName,
		productImage,
		location,
		resalePrice,
		originalPrice,
		yearsOfUsed,
		postingTime,
		sellerName,
		sellerEmail,
		sellerImage,
		condition,
		description,
		categoryName,
		advertised,
		sold,
		verified,
	} = product;

	return (
		<div className="rounded-md shadow-md sm:w-96 bg-gray-50 text-gray-800">
			<div className="flex items-center justify-between p-3">
				<div className="flex items-center space-x-2">
					<img
						src={sellerImage}
						alt=""
						className="object-cover object-center w-8 h-8 rounded-full shadow-sm bg-gray-500 border-gray-300"
					/>
					<div className="-space-y-1">
						<h2 className="text-sm font-semibold leading-none">
							{sellerName} {verified && <FaRegGem />}
						</h2>
						<span className="inline-block text-xs leading-none text-gray-600">
							{location}
						</span>
					</div>
				</div>
				<span>{postingTime}</span>
			</div>
			<img
				src={productImage}
				alt=""
				className="object-cover object-center w-full h-72 bg-gray-500"
			/>
			<div className="p-3">
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<h2 className="text-lg font-medium text-blue-500">
							{productName}
						</h2>
						<h2 className="text-lg font-medium text-blue-500">
							{categoryName}
						</h2>
					</div>
					<div className="flex justify-between items-center">
						<p>Original Price: ${originalPrice}</p>
						<p>Resale Price: ${resalePrice}</p>
					</div>
					<div className="flex justify-between items-center">
						<p>Years of Used: {yearsOfUsed}</p>
						<p>Condition: {condition}</p>
					</div>
					<p>{description}</p>
					<div className="flex justify-between items-center">
						<button className="py-2 px-6 font-medium rounded-2xl bg-blue-400 text-white">
							Book Now
						</button>
						<button className="py-2 px-6 font-medium rounded-2xl bg-red-400 text-white">
							Report
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductInformation;
