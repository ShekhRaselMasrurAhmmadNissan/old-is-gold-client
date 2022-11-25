import React from 'react';
import Lottie from 'lottie-react';
import error from '../../Assets/error.json';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div>
			<Lottie animationData={error} className="w-4/5 mx-auto h-[650px]" />
			<div className="text-center">
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
