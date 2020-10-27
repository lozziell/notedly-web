import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
	mutation signUp($email: String!, $username: String!, $password: String!) {
		signUp(email: $email, username: $username, password: $password)
	}
`;

const SignUp = props => {
	useEffect(() => {
		// update the document title
		document.title = 'Sign Up - Notedly';
	});	

	const client = useApolloClient();
	const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
		onCompleted: data => {
			// store the JWT in localStorage
			localStorage.setItem('token', data.signUp);
			// console to log the JSON web token when the mutation is complete
			// console.log(data.signUp);
			// update the local cache
			client.writeData({ data: { isLoggedIn: true } });
			// redirect to homepage
			props.history.push('/');
		}
	});

	// render form
	return (
		<React.Fragment>
			<UserForm action={signUp} formType="signup" />
			{/* if the data is loading, display a loading message*/}
			{loading && <p>Loading...</p>}
			{/* if there is an error, display a error message*/}
			{error && <p>Error creating an account!</p>}
		</React.Fragment>
	);
};

export default SignUp;