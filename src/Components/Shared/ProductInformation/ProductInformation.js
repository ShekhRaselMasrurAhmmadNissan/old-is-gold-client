import axios from 'axios';
import React, { useContext } from 'react';
import { FaRegGem } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const ProductInformation = ({ product, orderProduct, setOrderProduct }) => {
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
	const { user } = useContext(AuthContext);

	const handleReport = async (id) => {
		try {
			const report = await axios.patch(
				`http://localhost:5000/products/report/${id}?email=${user?.email}`,
				{},
				{
					headers: {
						authorization: `bearer ${localStorage.getItem(
							'old-is-gold-token'
						)}`,
					},
				}
			);
			console.log(report.data);
			toast.success('Report Successful Successfully.');
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.status === 403
			) {
				toast.error('Unauthorized Access');
				// logOut().catch((err) => console.error(err));
			}
			toast.error('Something Went wrong. Failed to report.');
		}
	};

	return (
		<div className="rounded-md shadow-md sm:w-96 bg-gray-50 text-gray-800">
			<div className="flex items-center justify-between p-3">
				<div className="flex items-center space-x-2">
					<img
						src={sellerImage}
						alt=""
						className="object-cover object-center w-10 h-10 rounded-full shadow-sm bg-gray-500 border-gray-300"
					/>
					<div className="-space-y-1">
						<h2 className="text-lg font-semibold leading-none text-blue-400">
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
						<label
							htmlFor="order-modal"
							className="py-2 px-6 font-medium rounded-2xl bg-blue-400 text-white cursor-pointer"
							onClick={() => setOrderProduct(product)}
						>
							Book Now
						</label>
						<button
							className="py-2 px-6 font-medium rounded-2xl bg-red-400 text-white"
							onClick={() => handleReport(product._id)}
						>
							Report
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductInformation;
