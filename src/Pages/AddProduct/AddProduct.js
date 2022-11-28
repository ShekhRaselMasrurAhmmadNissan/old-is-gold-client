import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns/esm';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../../Components/Shared/Loading/Loading';
import SmallLoading from '../../Components/Shared/SmallLoading/SmallLoading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const AddProduct = () => {
	const { register, handleSubmit, reset } = useForm();
	const [error, setError] = useState('');
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const time = new Date();
	const postingTime = format(time, 'Pp');

	const {
		data: categories,
		isLoading,
		error: LoaderError,
		isError,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const response = await axios.get(
				`http://localhost:5000/categories`
			);
			return response.data;
		},
	});

	const handleAddProduct = async (data) => {
		try {
			setLoading(true);
			const [categoryId, categoryName] = data.category.split('-');
			const image = data.image[0];
			const formData = new FormData();
			formData.append('image', image);

			const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageBB_Key}`;
			const imgBBResponse = await axios.post(url, formData);

			if (imgBBResponse.data.success) {
				const product = {
					productName: data.productName,
					productImage: imgBBResponse.data.data.url,
					location: data.location,
					categoryId,
					categoryName,
					postingTime,
					resalePrice: parseFloat(data.resalePrice),
					originalPrice: parseFloat(data.originalPrice),
					yearsOfUsed: parseInt(data.yearsOfUsed),
					condition: data.condition,
					description: data.description,
					sellerName: user.displayName,
					sellerEmail: user.email,
					sellerImage: user.photoURL,
					sold: false,
					advertised: false,
					reported: false,
				};

				const response = await axios.post(
					`http://localhost:5000/products?email=${user?.email}`,
					product,
					{
						headers: {
							authorization: `bearer ${localStorage.getItem(
								'old-is-gold-token'
							)}`,
						},
					}
				);
				console.log(response);
				toast.success('Product Added Successful.');
				reset();
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			if (
				error.response.status === 401 ||
				error.response.status === 403
			) {
				toast.error('Unauthorized Access');
				// logOut().catch((err) => console.error(err));
			}
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="w-full max-w-lg p-8 space-y-3 rounded-xl bg-gray-200 mt-8 md:mx-auto text-gray-800">
			<h1 className="text-3xl font-bold text-center text-blue-500">
				Add Product
			</h1>
			<form
				onSubmit={handleSubmit(handleAddProduct)}
				action=""
				className="space-y-6 ng-untouched ng-pristine ng-valid"
			>
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
						placeholder="Product Name"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Picture</span>
					</label>
					<input
						type="file"
						{...register('image', {
							required: 'Picture is Required',
						})}
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label htmlFor="category" className="block text-gray-600">
						Category
					</label>
					{isLoading ? (
						<SmallLoading />
					) : (
						<select
							{...register('category')}
							className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none cursor-pointer"
						>
							{categories.map((category) => (
								<option
									key={category._id}
									value={`${category._id}-${category.name}`}
								>
									{category.name}
								</option>
							))}
						</select>
					)}
				</div>
				<div className="space-y-1 text-sm">
					<label htmlFor="location" className="block text-gray-600">
						Location
					</label>
					<input
						type="text"
						{...register('location')}
						id="location"
						placeholder="Location"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label
						htmlFor="resalePrice"
						className="block text-gray-600"
					>
						Resale Price
					</label>
					<input
						type="number"
						{...register('resalePrice')}
						id="resalePrice"
						placeholder="Resale Price"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label
						htmlFor="originalPrice"
						className="block text-gray-600"
					>
						Original Price
					</label>
					<input
						type="number"
						{...register('originalPrice')}
						id="originalPrice"
						placeholder="Original Price"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label
						htmlFor="yearsOfUsed"
						className="block text-gray-600"
					>
						Years of Used
					</label>
					<input
						type="number"
						{...register('yearsOfUsed')}
						id="yearsOfUse"
						placeholder="Years of Used"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>

				<div className="space-y-1 text-sm">
					<label htmlFor="condition" className="block text-gray-600">
						Condition
					</label>
					<select
						{...register('condition')}
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none cursor-pointer"
					>
						<option value="Very Bad">Very Bad</option>
						<option value="Bad">Bad</option>
						<option value="Good">Good</option>
						<option value="Very Good">Very Good</option>
						<option value="Excellent">Excellent</option>
					</select>
				</div>
				<div className="space-y-1 text-sm">
					<label
						htmlFor="description"
						className="block text-gray-600"
					>
						Description
					</label>
					<textarea
						type="text"
						{...register('description')}
						rows={5}
						id="description"
						placeholder="Description"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				{error && (
					<p className="text-md font-medium text-red-500">{error}</p>
				)}
				<p className="text-center">
					<button
						type="submit"
						className="block w-full p-3 text-center text-lg text-gray-50 bg-blue-600 rounded-lg"
					>
						Add Product
					</button>
				</p>
			</form>
		</div>
	);
};

export default AddProduct;
