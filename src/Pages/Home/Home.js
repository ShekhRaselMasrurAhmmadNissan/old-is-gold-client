import React from 'react';
import Advertised from '../../Components/Home/Advertised/Advertised';
import Banner from '../../Components/Home/Banner/Banner';
import Categories from '../../Components/Home/Categories/Categories';
import WhyUs from '../../Components/Home/WhyUS/WhyUs';

const Home = () => {
	return (
		<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-4">
			<Banner />
			<Advertised />
			<Categories />
			<WhyUs />
		</div>
	);
};

export default Home;
