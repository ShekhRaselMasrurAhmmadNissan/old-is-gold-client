import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useBuyer from '../../Hooks/useBuyer';

const BuyerRoute = ({ children }) => {
	const { user, loading, logout } = useContext(AuthContext);
	const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
	const location = useLocation();

	if (loading || isBuyerLoading) {
		return <Loading />;
	}

	if (user && isBuyer) {
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

export default BuyerRoute;
