import axios from 'axios';
import { useEffect, useState } from 'react';

const useToken = (email) => {
	const [token, setToken] = useState('');

	useEffect(() => {
		if (email) {
			const generateToken = async () => {
				try {
					const response = await axios.get(
						`https://old-is-gold-server-pi.vercel.app/jwt?email=${email}`
					);

					if (response.data.accessToken) {
						localStorage.setItem(
							'old-is-gold-token',
							response.data.accessToken
						);
						setToken(response.data.accessToken);
					}
				} catch (error) {
					console.error(error.name, error.message, error.stack);
				}
			};
			generateToken();
		}
	}, [email]);
	return [token];
};

export default useToken;
