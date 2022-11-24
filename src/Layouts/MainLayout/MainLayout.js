import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Shared/Navbar/Navbar';

const MainLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
			<h2 className="text-3xl font-medium text-green-700">
				Footer will Go Here.
			</h2>
		</div>
	);
};

export default MainLayout;
