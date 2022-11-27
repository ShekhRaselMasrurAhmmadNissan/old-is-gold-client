import axios from 'axios';
import { useEffect, useState } from 'react';

const useSeller = (email) => {
	const [isSeller, setIsSeller] = useState(false);
	const [isSellerLoading, setIsSellerLoading] = useState(true);
	useEffect(() => {
		if (email) {
			try {
				const checkSeller = async () => {
					const response = await axios.get(
						`http://localhost:5000/users/seller/${email}`
					);
					console.log(response.data);
					setIsSeller(response.data.isSeller);
					setIsSellerLoading(false);
				};
				checkSeller();
			} catch (error) {
				console.error(error);
			}
		}
	}, [email]);
	return [isSeller, isSellerLoading];
};

export default useSeller;
