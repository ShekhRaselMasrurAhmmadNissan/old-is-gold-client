import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SmallLoading from '../../Components/Shared/SmallLoading/SmallLoading';

const AddProduct = () => {
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState('');

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

	const handleAddProduct = (data) => {
		console.log(data);
	};
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
					<label htmlFor="name" className="block text-gray-600">
						Product Name
					</label>
					<input
						type="text"
						{...register('name')}
						id="name"
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
					<label htmlFor="yearsOfUse" className="block text-gray-600">
						Years of Used
					</label>
					<input
						type="number"
						{...register('yearsOfUse')}
						id="yearsOfUse"
						placeholder="Years of Used"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
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
