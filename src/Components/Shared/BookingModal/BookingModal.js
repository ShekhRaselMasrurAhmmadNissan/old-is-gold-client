import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const BookingModal = ({ orderProduct, setOrderProduct }) => {
	const { register, handleSubmit, reset } = useForm();
	const { user } = useContext(AuthContext);

	const handleBook = async (data) => {
		try {
			const order = {
				buyerName: data.buyerName,
				buyerEmail: data.buyerEmail,
				buyerImage: user?.photoURL,
				productID: orderProduct._id,
				productName: data.productName,
				meetingLocation: data.meetingLocation,
				categoryName: orderProduct.categoryName,
				resalePrice: parseFloat(orderProduct.resalePrice),
				originalPrice: parseFloat(orderProduct.originalPrice),
				yearsOfUsed: parseInt(orderProduct.yearsOfUsed),
				condition: orderProduct.condition,
				description: orderProduct.description,
				sellerName: orderProduct.sellerName,
				sellerEmail: orderProduct.sellerEmail,
				sellerImage: orderProduct.sellerImage,
				verified: orderProduct.verified,
				sold: orderProduct.sold,
				advertised: orderProduct.advertised,
				reported: orderProduct.reported,
			};
			console.log(order);

			const response = await axios.post(
				`https://old-is-gold-server-pi.vercel.app/orders`,
				order
			);

			if (response.data.found) {
				toast.warning('You have already orders this product.');
			} else {
				console.log(response);
				toast.success('Order placed Successfully.');
			}
			reset();
			setOrderProduct(null);
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	return (
		<>
			<input type="checkbox" id="order-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="order-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<h1 className="text-3xl font-bold text-center text-blue-500">
						Order Product
					</h1>
					<form
						onSubmit={handleSubmit(handleBook)}
						action=""
						className="space-y-6 ng-untouched ng-pristine ng-valid"
					>
						<div className="space-y-1 text-sm">
							<label
								htmlFor="buyerName"
								className="block text-gray-600"
							>
								Name
							</label>
							<input
								type="text"
								{...register('buyerName')}
								id="buyerName"
								value={user?.displayName}
								placeholder="Buyer Name"
								className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
								required
								readOnly
							/>
						</div>
						<div className="space-y-1 text-sm">
							<label
								htmlFor="buyerEmail"
								className="block text-gray-600"
							>
								Email
							</label>
							<input
								type="text"
								{...register('buyerEmail')}
								id="buyerEmail"
								value={user?.email}
								placeholder="Buyer Email"
								className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
								required
								readOnly
							/>
						</div>
						<div className="space-y-1 text-sm">
							<label
								htmlFor="productName"
								className="block text-gray-600"
							>
								Product Name
							</label>
							<input
								type="text"
								{...register('productName')}
								id="productName"
								value={orderProduct.productName}
								placeholder="Buyer Email"
								className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
								required
								readOnly
							/>
						</div>
						<div className="space-y-1 text-sm">
							<label
								htmlFor="price"
								className="block text-gray-600"
							>
								Resale Price
							</label>
							<input
								type="text"
								{...register('price')}
								id="price"
								value={orderProduct.resalePrice}
								placeholder="Price"
								className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
								required
								readOnly
							/>
						</div>
						<div className="space-y-1 text-sm">
							<label
								htmlFor="phone"
								className="block text-gray-600"
							>
								Phone Number
							</label>
							<input
								type="number"
								{...register('phone')}
								id="phone"
								placeholder="Phone Number"
								className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
								required
							/>
						</div>
						<div className="space-y-1 text-sm">
							<label
								htmlFor="meetingLocation"
								className="block text-gray-600"
							>
								Meeting Location
							</label>
							<input
								type="text"
								{...register('meetingLocation')}
								id="meetingLocation"
								placeholder="Meeting Location"
								className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
								required
							/>
						</div>
						<p className="text-center">
							<button
								type="submit"
								className="block w-full p-3 text-center text-lg text-gray-50 bg-blue-600 rounded-lg"
							>
								Submit Order
							</button>
						</p>
					</form>
				</div>
			</div>
		</>
	);
};

export default BookingModal;
