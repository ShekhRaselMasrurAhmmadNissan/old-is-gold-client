import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../../Components/Shared/Footer/Footer';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import useSeller from '../../Hooks/useSeller';

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin(user?.email);
	const [isSeller] = useSeller(user?.email);

	const adminRoutes = (
		<>
			<li>
				<NavLink to="allSellers">All Sellers</NavLink>
			</li>
			<li>
				<NavLink to="allBuyers">All Buyer</NavLink>
			</li>
			<li>
				<NavLink to="reportedItems">Reported Items</NavLink>
			</li>
		</>
	);

	const sellerRoutes = (
		<>
			<li>
				<NavLink to={`allProducts/${user?.email}`}>
					All Products
				</NavLink>
			</li>
			<li>
				<NavLink to="addProduct">Add Product</NavLink>
			</li>
		</>
	);

	return (
		<div className="">
			<Navbar />
			<div className="flex-none lg:hidden sticky top-0">
				<label
					htmlFor="dashboard-drawer"
					className="btn btn-square btn-ghost w-full flex justify-start"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>{' '}
					Dashboard Menu
				</label>
			</div>
			<div className="drawer drawer-mobile">
				<input
					id="dashboard-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					<Outlet />
				</div>

				<div className="drawer-side bg-white">
					<label
						htmlFor="dashboard-drawer"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 lg:w-80 text-base-content">
						{isAdmin && adminRoutes}
						{isSeller && sellerRoutes}
					</ul>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default DashboardLayout;
