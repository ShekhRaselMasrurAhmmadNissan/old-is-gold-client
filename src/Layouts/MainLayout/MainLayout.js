import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<div>
			<h2 className="text-3xl font-medium text-green-700">
				Navbar will Go Here.
			</h2>
			<Outlet />
			<h2 className="text-3xl font-medium text-green-700">
				Footer will Go Here.
			</h2>
		</div>
	);
};

export default MainLayout;
