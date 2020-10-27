import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
	mutation signIn($email: String!, $password: String!) {
		signIn(email: $email, password: $password)
	}
`;


// include the props passed to  the component for later use
const SignIn = props => {
	useEffect(() => {
		// update the document title
		document.title = 'Sign In - Notedly';
	});	

	const client = useApolloClient();
	const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
		onCompleted: data => {
			// store the tokem
			localStorage.setItem('token', data.signIn);
			// update the local cache
			client.writeData({ data: { isLoggedIn: true } });
			//redirect the user to the homepage
			props.history.push('/');
		}
	});

	// render form
	return (
		<React.Fragment>
			<UserForm action={signIn} formType="signIn" />
			{/* if the data is laoding, display a loading message*/}
			{loading && <p>Loading...</p>}
			{/* if there is an error, display an error message*/}
			{error && <p>Error signing in!</p>}
		</React.Fragment>
	);
};

export default SignIn;