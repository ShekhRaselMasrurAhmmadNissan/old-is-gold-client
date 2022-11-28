import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import AddProduct from '../Pages/AddProduct/AddProduct';
import AllBuyer from '../Pages/AllBuyer/AllBuyer';
import AllProducts from '../Pages/AllProducts/AllProducts';
import AllSeller from '../Pages/AllSeller/AllSeller';
import Blogs from '../Pages/Blogs/Blogs';
import CategoryProducts from '../Pages/CategoryProducts/CategoryProducts';
import DashboardMain from '../Pages/DashboardMain/DashboardMain';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import AdminRoute from './AdminRoute/AdminRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import SellerRoute from './SellerRoute/SellerRoute';

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
			{ path: 'blogs', element: <Blogs /> },
			{
				path: 'categories/:id',
				element: (
					<PrivateRoute>
						<CategoryProducts />
					</PrivateRoute>
				),
				loader: ({ params }) =>
					fetch(`http://localhost:5000/categories/${params.id}`),
			},
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
			{
				path: 'allProducts/:email',
				element: (
					<SellerRoute>
						<AllProducts />
					</SellerRoute>
				),
			},
			{
				path: 'addProduct',
				element: (
					<SellerRoute>
						<AddProduct />
					</SellerRoute>
				),
			},
		],
	},
]);

export default router;
