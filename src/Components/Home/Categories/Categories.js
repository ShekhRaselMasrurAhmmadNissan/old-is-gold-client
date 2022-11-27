import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import SmallLoading from '../../Shared/SmallLoading/SmallLoading';

const Categories = () => {
	const {
		data: categories,
		isLoading,
		error,
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

	return (
		<div className="mt-8 bg-gray-100 py-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				Categories
			</h1>
			{isError ? (
				<p className="text-2xl font-medium text-red-600">
					Sorry..!!! Something went wrong.
					<span className="italic underline">{error}</span>
				</p>
			) : isLoading ? (
				<SmallLoading />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-evenly mt-4">
					{categories.map((category) => (
						<div
							key={category._id}
							className="w-[90%] mx-auto text-center bg-gray-200 rounded-xl p-4"
						>
							<h2 className="text-xl md:text-2xl font-medium text-blue-800 mb-3">
								{category.name}
							</h2>
							<Link
								to={`/categories/${category._id}`}
								className="p-2 bg-teal-500 text-xl text-white font-medium rounded-md"
							>
								View all of this Category
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Categories;
