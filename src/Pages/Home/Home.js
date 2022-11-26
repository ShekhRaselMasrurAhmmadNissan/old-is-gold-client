import React from 'react';
import Banner from '../../Components/Home/Banner/Banner';
import WhyUs from '../../Components/Home/WhyUS/WhyUs';

const Home = () => {
	return (
		<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-4">
			<Banner />
			<h2 className="text-3xl">Advertise section</h2>
			<h2 className="text-3xl">Categories.</h2>
			<WhyUs />
		</div>
	);
};

export default Home;
