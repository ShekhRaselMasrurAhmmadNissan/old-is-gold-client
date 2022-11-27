import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';

const BuyerRoute = ({ children }) => {
	const { user, loading, logOut } = useContext(AuthContext);
	const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
	const location = useLocation();

	if (loading || isBuyerLoading) {
		return <progress className="progress w-56"></progress>;
	}

	if (user && isBuyer) {
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

export default BuyerRoute;
