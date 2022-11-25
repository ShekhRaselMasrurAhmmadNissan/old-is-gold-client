import React from 'react';
import Lottie from 'lottie-react';
import error from '../../Assets/error.json';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div className="mt-6">
			<Lottie
				animationData={error}
				className="w-4/5 mx-auto lg:h-[650px]"
			/>
			<div className="text-center mt-2">
				<Link
					to="/home"
					className="bg-blue-600 text-white text-lg px-3 py-1 rounded-md font-medium"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default Error;
