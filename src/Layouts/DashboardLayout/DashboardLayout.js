import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin(user?.email);

	return (
		<div>
			<Navbar />
			<div className="drawer drawer-mobile">
				<input
					id="dashboard-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					<Outlet />
				</div>
				<div className="drawer-side">
					<label
						htmlFor="dashboard-drawer"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 w-80 text-base-content">
						{isAdmin && (
							<>
								<li>
									<NavLink to="allSellers">
										All Sellers
									</NavLink>
								</li>
								<li>
									<NavLink to="allBuyer">All Buyer</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
