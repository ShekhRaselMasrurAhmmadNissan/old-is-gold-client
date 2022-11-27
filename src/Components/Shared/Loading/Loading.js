import Lottie from 'lottie-react';
import React from 'react';
import spinner from '../../../Assets/spinner.json';

const Loading = () => {
	return <Lottie animationData={spinner} />;
};

export default Loading;
