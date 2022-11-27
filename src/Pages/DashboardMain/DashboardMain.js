import Lottie from 'lottie-react';
import React from 'react';
import dashboard from '../../Assets/dashboard.json';
const DashboardMain = () => {
	return (
		<div>
			<Lottie animationData={dashboard} className="h-[60%] w-4/5" />
		</div>
	);
};

export default DashboardMain;
