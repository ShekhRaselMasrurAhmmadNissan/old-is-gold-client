import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import AllBuyer from '../Pages/AllBuyer/AllBuyer';
import AllSeller from '../Pages/AllSeller/AllSeller';
import DashboardMain from '../Pages/DashboardMain/DashboardMain';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AdminRoute from './AdminRoute/AdminRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const { createBrowserRouter } = require('react-router-dom');
const { default: MainLayout } = require('../Layouts/MainLayout/MainLayout');

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'home', element: <Home /> },
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
		],
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		errorElement: <Error />,
		children: [
			{ index: true, element: <DashboardMain /> },
			{
				path: 'allSellers',
				element: (
					<AdminRoute>
						<AllSeller />
					</AdminRoute>
				),
			},
			{
				path: 'allBuyers',
				element: (
					<AdminRoute>
						<AllBuyer />
					</AdminRoute>
				),
			},
		],
	},
]);

export default router;
