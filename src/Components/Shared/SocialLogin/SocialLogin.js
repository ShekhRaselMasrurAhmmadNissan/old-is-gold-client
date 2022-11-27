import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useToken from '../../../Hooks/useToken';

const SocialLogin = () => {
	const { providerSignIn } = useContext(AuthContext);
	const [createdUserEmail, setCreatedUserEmail] = useState('');
	const [token] = useToken(createdUserEmail);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/home';
	const googleProvider = new GoogleAuthProvider();
	if (token) {
		navigate(from, { replace: true });
	}

	const handleGoogleSignIn = async () => {
		try {
			const response = await providerSignIn(googleProvider);
			saveUserInTheDB(
				response.user.userName,
				response.user.email,
				response.user.photoURL
			);
		} catch (error) {
			console.error(error);
		}
	};

	const saveUserInTheDB = async (name, email, image) => {
		const user = { name, email, image, role: 'buyer' };
		try {
			const response = await axios.post(
				`http://localhost:5000/users`,
				user
			);
			console.log('saving user:', response);
			if (response.data.found) {
				setCreatedUserEmail(response.data.email);
			} else {
				setCreatedUserEmail(email);
			}
		} catch (error) {
			console.error(error.name, error.message, error.stack);
		}
	};

	return (
		<>
			<div className="flex items-center pt-4 space-x-1">
				<div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
				<p className="px-3 text-sm text-gray-600">
					Login with social accounts
				</p>
				<div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
			</div>
			<div className="my-6 space-y-4">
				<button
					aria-label="Login with Google"
					type="button"
					className="flex items-center justify-center w-full p-4 space-x-4 rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-blue-600 bg-blue-600 text-white hover:bg-blue-700 outline-none"
					onClick={handleGoogleSignIn}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 32 32"
						className="w-5 h-5 fill-current"
					>
						<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
					</svg>
					<p className="font-medium">Login with Google</p>
				</button>
			</div>
		</>
	);
};

export default SocialLogin;
