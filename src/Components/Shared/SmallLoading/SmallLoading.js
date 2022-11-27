import Lottie from 'lottie-react';
import React from 'react';
import smallSpinner from '../../../Assets/small-spinner.json';

const SmallLoading = () => {
	return (
		<div className="flex justify-center items-center">
			<Lottie animationData={smallSpinner} className="h-32 w-32" />
		</div>
	);
};
export default SmallLoading;
