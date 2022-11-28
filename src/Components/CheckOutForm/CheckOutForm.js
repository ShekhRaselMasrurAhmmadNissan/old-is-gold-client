import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckOutForm = ({ order }) => {
	const stripe = useStripe();
	const elements = useElements();

	const navigate = useNavigate();

	const [cardError, setCardError] = useState('');
	const [success, setSuccess] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionID, setTransactionID] = useState('');
	const [clientSecret, setClientSecret] = useState('');

	const { _id, productName, productID, resalePrice, buyerName, buyerEmail } =
		order;

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch('http://localhost:5000/create-payment-intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `bearer ${localStorage.getItem(
					'old-is-gold-token'
				)}`,
			},
			body: JSON.stringify({ resalePrice }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [resalePrice]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});
		if (error) {
			console.log(error);
			setCardError(error.message);
		} else {
			setCardError('');
		}
		setSuccess('');
		setProcessing(true);
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: buyerName,
						email: buyerEmail,
					},
				},
			});
		if (confirmError) {
			setCardError(confirmError.message);
			return;
		}
		if (paymentIntent.status === 'succeeded') {
			// Store payment information in the Database.
			const payment = {
				resalePrice,
				transactionID: paymentIntent.id,
				buyerEmail,
				productID: productID,
			};
			fetch('http://localhost:5000/payments', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${localStorage.getItem(
						'old-is-gold-token'
					)}`,
				},
				body: JSON.stringify(payment),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.result.insertedId) {
						setSuccess('Congrats! your payment completed');
						setTransactionID(paymentIntent.id);
						toast.success('Payment Successful.');
						navigate('/');
					}
				});
		}
		setProcessing(false);
		console.log('payment intent', paymentIntent);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<button
					type="submit"
					disabled={!stripe || !clientSecret || processing}
					className="btn btn-sm btn-primary mt-4 text-white"
				>
					Pay
				</button>
			</form>
			{cardError && <p className="text-red-600">{cardError}</p>}
			{success && (
				<div>
					<p className="text-green-500">{success}</p>
					<p>
						Your transaction ID:{' '}
						<span className="font-bold">{transactionID}</span>
					</p>
				</div>
			)}
		</>
	);
};

export default CheckOutForm;
