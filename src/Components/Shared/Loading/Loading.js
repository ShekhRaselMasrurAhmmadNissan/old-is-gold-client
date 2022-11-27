import Lottie from 'lottie-react';
import React from 'react';
import spinner from '../../../Assets/spinner.json';

const Loading = () => {
	return (
		<div className="flex justify-center items-center">
			<Lottie animationData={spinner} className="h-48 w-48" />
		</div>
	);
};

export default Loading;
