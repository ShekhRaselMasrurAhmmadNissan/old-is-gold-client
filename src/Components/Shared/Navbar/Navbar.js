import React, { useContext, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			const response = await logout();
			setIsMenuOpen(false);
			// toast.success('Logout Successful.');
		} catch (error) {
			console.error(error);
		}
	};

	const navItems = (
		<>
			<li>
				<NavLink
					to="/home"
					title="Home"
					className={({ isActive }) =>
						isActive
							? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
							: `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
					}
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/blogs"
					title="Blogs"
					className={({ isActive }) =>
						isActive
							? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
							: `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
					}
				>
					Blogs
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/about-us"
					title="About us"
					className={({ isActive }) =>
						isActive
							? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
							: `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
					}
				>
					About us
				</NavLink>
			</li>
			{user && user.uid ? (
				<>
					<li>
						<NavLink
							to="/dashboard"
							title="Dashboard"
							className={({ isActive }) =>
								isActive
									? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
									: `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
							}
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<button
							title="Logout"
							className="font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl"
							onClick={handleLogout}
						>
							Logout
						</button>
					</li>
					<li className="flex items-center">
						{user?.photoURL ? (
							<img
								src={user?.photoURL}
								alt=""
								title={user?.displayName}
								className="h-12 w-12 object-center rounded-full"
							/>
						) : (
							<FaUserAlt
								title={user?.displayName}
								className="h-12 w-12 rounded-full object-center"
							/>
						)}
						<p className="lg:hidden text-white text-lg ml-3">
							{user?.displayName}
						</p>
					</li>
				</>
			) : (
				<>
					<li>
						<NavLink
							to="/login"
							title="Sign in"
							className={({ isActive }) =>
								isActive
									? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
									: `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
							}
						>
							Sign in
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/register"
							className={({ isActive }) =>
								isActive
									? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
									: `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
							}
							title="Sign up"
						>
							Sign up
						</NavLink>
					</li>
				</>
			)}
		</>
	);
	return (
		<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-4">
			<div className="relative flex items-center justify-between">
				<a
					href="/"
					aria-label="Company"
					title="Company"
					className="inline-flex items-center mr-8"
				>
					<span className="ml-2 text-xl font-bold tracking-wide text-yellow-500 uppercase">
						Old is Gold
					</span>
				</a>
				<ul className="flex items-center hidden space-x-8 lg:flex text-xl">
					{navItems}
				</ul>
				<div className="lg:hidden">
					<button
						aria-label="Open Menu"
						title="Open Menu"
						className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
						onClick={() => setIsMenuOpen(true)}
					>
						<svg className="w-5 text-gray-600" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
							/>
							<path
								fill="currentColor"
								d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
							/>
							<path
								fill="currentColor"
								d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
							/>
						</svg>
					</button>
					{isMenuOpen && (
						<div className="absolute top-0 left-0 w-full z-50">
							<div className="p-5 bg-white border rounded shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<div>
										<Link
											to="/"
											title="Old is Gold"
											className="inline-flex items-center"
										>
											<span className="ml-2 text-xl font-bold tracking-wide text-yellow-500 uppercase">
												Old is Gold
											</span>
										</Link>
									</div>
									<div>
										<button
											aria-label="Close Menu"
											title="Close Menu"
											className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
											onClick={() => setIsMenuOpen(false)}
										>
											<svg
												className="w-5 text-gray-600"
												viewBox="0 0 24 24"
											>
												<path
													fill="currentColor"
													d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
												/>
											</svg>
										</button>
									</div>
								</div>
								<nav>
									<ul className="space-y-4">{navItems}</ul>
								</nav>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
