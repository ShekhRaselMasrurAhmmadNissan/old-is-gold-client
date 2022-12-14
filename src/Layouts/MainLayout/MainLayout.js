import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Shared/Footer/Footer';
import Navbar from '../../Components/Shared/Navbar/Navbar';

const MainLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default MainLayout;
