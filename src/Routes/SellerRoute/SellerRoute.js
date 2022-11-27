import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useSeller from '../../Hooks/useSeller';

const SellerRoute = ({ children }) => {
	const { user, loading, logOut } = useContext(AuthContext);
	const [isSeller, isSellerLoading] = useSeller(user?.email);
	const location = useLocation();

	if (loading || isSellerLoading) {
		return <progress className="progress w-56"></progress>;
	}

	if (user && isSeller) {
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

export default SellerRoute;
