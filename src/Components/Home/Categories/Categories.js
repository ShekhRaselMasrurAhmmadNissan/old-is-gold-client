import React from 'react';

const Categories = () => {
	return (
		<div className="mt-8 bg-gray-100 py-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				Categories
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-evenly mt-4">
				<div className="w-[90%] mx-auto text-center bg-gray-200 rounded-xl p-4">
					<h2 className="text-xl md:text-2xl font-medium text-emerald-800 mb-3">
						Verified Sellers
					</h2>
					<button className="p-2 bg-teal-500 text-xl text-white font-medium rounded-md">
						View all of this Category
					</button>
				</div>
			</div>
		</div>
	);
};

export default Categories;
