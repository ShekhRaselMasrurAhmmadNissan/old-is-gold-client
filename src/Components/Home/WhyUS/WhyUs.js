import React from 'react';

const WhyUs = () => {
	return (
		<div className="mt-8 bg-gray-100 py-8 rounded-xl">
			<h1 className="text-center text-4xl font-medium text-blue-600">
				Why Choose Us
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-evenly mt-4">
				<div className="w-[90%] mx-auto text-center bg-gray-200 rounded-lg p-4">
					<h2 className="text-xl md:text-2xl font-medium text-emerald-800 mb-3">
						Verified Sellers
					</h2>
					<p>
						We have a lots of verified sellers in this platform. You
						can trust them and buy books from them.
					</p>
				</div>
				<div className="w-[90%] mx-auto text-center bg-gray-200 rounded-lg p-4">
					<h2 className="text-xl md:text-2xl font-medium text-emerald-800 mb-3">
						Reputation
					</h2>
					<p>
						Our reputation is beyond compare. People trusts us and
						feels comfortable to buy books from us.
					</p>
				</div>
				<div className="w-[90%] mx-auto text-center bg-gray-200 rounded-lg p-4">
					<h2 className="text-xl md:text-2xl font-medium text-emerald-800 mb-3">
						Availability
					</h2>
					<p>
						You can find various types of books here. Countless
						books from multiple genre.
					</p>
				</div>
			</div>
		</div>
	);
};

export default WhyUs;
