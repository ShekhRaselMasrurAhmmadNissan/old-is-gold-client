import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
	const { user, loading, logout } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return <Loading />;
	}

	if (user) {
		return children;
	}

	if (!user) {
		return (
			<Navigate to="/login" state={{ from: location }} replace></Navigate>
		);
	}

	return logout()
		.then(() => (
			<Navigate to="/login" state={{ from: location }} replace></Navigate>
		))
		.catch((error) => console.error(error));
};

export default PrivateRoute;
