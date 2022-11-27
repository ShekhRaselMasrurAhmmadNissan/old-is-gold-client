import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
	const { user, loading, logOut } = useContext(AuthContext);
	const [isAdmin, isAdminLoading] = useAdmin(user?.email);
	const location = useLocation();

	if (loading || isAdminLoading) {
		return <progress className="progress w-56"></progress>;
	}

	if (user && isAdmin) {
		return children;
	}

	if (!user) {
		return (
			<Navigate to="/login" state={{ from: location }} replace></Navigate>
		);
	}

	return logOut()
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
