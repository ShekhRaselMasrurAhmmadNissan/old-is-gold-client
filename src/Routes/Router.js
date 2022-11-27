import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';

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
		element: <DashboardLayout />,
		errorElement: <Error />,
	},
]);

export default router;
