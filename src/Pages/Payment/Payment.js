import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckOutForm from '../../Components/CheckOutForm/CheckOutForm';
import Loading from '../../Components/Shared/Loading/Loading';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	console.log(id);

	const {
		data: order,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['order', user?.email],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/orders/${id}?email=${user?.email}`
				);
				console.log(response.data);
				return response.data;
			} catch (error) {
				// if (
				// 	error.response.status === 401 ||
				// 	error.response.status === 403
				// ) {
				// 	toast.error('Unauthorized Access');
				// 	// logOut().catch((err) => console.error(err));
				// }
			}
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	const { productName, resalePrice } = order;

	return (
		<div>
			<h2 className="text-3xl font-medium">Payment for {productName}</h2>
			<p className="text-xl">
				Please pay ${resalePrice} to confirm the order.
			</p>
			<p className="text-xl"></p>
			<div className="w-96 my-6">
				<Elements stripe={stripePromise}>
					<CheckOutForm order={order} />
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
