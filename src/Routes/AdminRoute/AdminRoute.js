import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
	const { user, loading, logout } = useContext(AuthContext);
	const [isAdmin, isAdminLoading] = useAdmin(user?.email);
	const location = useLocation();

	if (loading || isAdminLoading) {
		return <Loading />;
	}

	if (user && isAdmin) {
		return children;
	}

	if (!user) {
		return (
			<Navigate to="/login" state={{ from: location }} replace></Navigate>
		);
	}

	return logout()
		.then(() => {
			return (
				<Navigate
					to="/login"
					state={{ from: location }}
					replace
				></Navigate>
			);
		})
		.catch((error) => console.error(error));
};

export default AdminRoute;
