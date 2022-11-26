import React from 'react';
import Banner from '../../Components/Home/Banner/Banner';
import WhyUs from '../../Components/Home/WhyUS/WhyUs';

const Home = () => {
	return (
		<div>
			<Banner />
			<h2 className="text-3xl">Advertise section</h2>
			<h2 className="text-3xl">Categories.</h2>
			<WhyUs />
		</div>
	);
};

export default Home;
