import React, { createContext, useEffect, useState } from 'react';

import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import app from '../../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const emailRegister = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const userUpdate = (userInformation) => {
		setLoading(true);
		return updateProfile(auth.currentUser, userInformation);
	};

	const login = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		localStorage.removeItem('old-is-gold-token');
		setLoading(true);
		return signOut(auth);
	};

	const providerSignIn = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);

			return () => {
				unsubscribe();
			};
		});
	}, []);
	const authInfo = {
		user,
		loading,
		setLoading,
		emailRegister,
		userUpdate,
		providerSignIn,
		login,
		logout,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
