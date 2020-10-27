import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
// import the query
import { GET_MY_FAVOURITES } from '../gql/query';

const Favourites = () => {
	useEffect(() => {
		// update document title
		document.title = 'Favourites - Notedly';
	});

	const { loading, error, data } = useQuery(GET_MY_FAVOURITES);

	// if the data is loading, our app will display a loading message
	if (loading) return 'Loading...';
	// if there is an error fetching the data, display an error message
	if (error) return `Error! ${error.message}`;
	// if the query is successful and there are notes, return the feed of notes
	// else if the qury is successful and there arent notes, display a message
	if (data.me.favourites.length !== 0) {
		return <NoteFeed notes={data.me.favourites} />;
	} else {
		return <p>No favourites yet</p>;
	}

};

export default Favourites;