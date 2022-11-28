import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SmallSpinner from '../../Components/Shared/SmallSpinner/SmallSpinner';
import SocialLogin from '../../Components/Shared/SocialLogin/SocialLogin';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const Register = () => {
	const [error, setError] = useState('');
	const [createdUserEmail, setCreatedUserEmail] = useState('');
	const [token] = useToken(createdUserEmail);
	const { emailRegister, userUpdate, loading, setLoading } =
		useContext(AuthContext);
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	if (token) {
		navigate('/');
	}

	const handleRegister = async (data) => {
		console.log(data);

		try {
			const response = await emailRegister(data.email, data.password);
			const user = response.user;
			console.log(user);

			const image = data.image[0];
			const formData = new FormData();
			formData.append('image', image);

			const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageBB_Key}`;
			const imgBBResponse = await axios.post(url, formData);
			console.log(imgBBResponse.data);
			const updatedUser = {
				displayName: data.userName,
				photoURL: imgBBResponse.data.data.url,
			};
			saveUserInTheDB(
				data.userName,
				response.user.email,
				imgBBResponse.data.data.url,
				data.role
			);
			const updateHandle = await userUpdate(updatedUser);
			console.log(updateHandle);
			toast.success('User Registered Successfully.');
			// navigate('/home');
		} catch (error) {
			console.error(error);
			setError(error.message);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const saveUserInTheDB = async (name, email, image, role) => {
		const user = { name, email, image, role };
		console.log(user);
		try {
			const response = await axios.post(
				`https://old-is-gold-server-pi.vercel.app/users`,
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
		<div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-200 mt-8 md:mx-auto text-gray-800">
			<h1 className="text-3xl font-bold text-center text-blue-500">
				Sign Up
			</h1>
			<form
				onSubmit={handleSubmit(handleRegister)}
				action=""
				className="space-y-6 ng-untouched ng-pristine ng-valid"
			>
				<div className="space-y-1 text-sm">
					<label htmlFor="userName" className="block text-gray-600">
						User Name
					</label>
					<input
						type="text"
						{...register('userName')}
						id="userName"
						placeholder="User Name"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						{' '}
						<span className="label-text">Picture</span>
					</label>
					<input
						type="file"
						{...register('image', {
							required: 'Picture is Required',
						})}
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label htmlFor="email" className="block text-gray-600">
						Email
					</label>
					<input
						type="email"
						{...register('email')}
						id="email"
						placeholder="Email"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label htmlFor="password" className="block text-gray-600">
						Password
					</label>
					<input
						type="password"
						{...register('password')}
						id="password"
						placeholder="Password"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none"
						required
					/>
				</div>
				<div className="space-y-1 text-sm">
					<label htmlFor="role" className="block text-gray-600">
						Role
					</label>
					<select
						{...register('role')}
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-none cursor-pointer"
					>
						<option value="buyer">Buyer</option>
						<option value="seller">Seller</option>
					</select>
				</div>
				{error && (
					<p className="text-md font-medium text-red-500">{error}</p>
				)}
				<p className="text-center">
					{loading ? (
						<SmallSpinner />
					) : (
						<button
							type="submit"
							className="block w-full p-3 text-center text-lg text-gray-50 bg-blue-600 rounded-lg"
						>
							Sign Up
						</button>
					)}
				</p>
			</form>
			<SocialLogin />
			<p className="text-sm text-center sm:px-6 text-gray-600">
				Already have an account?{' '}
				<Link to="/login" className="underline text-blue-800">
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
