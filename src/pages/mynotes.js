import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query'; 

const MyNotes = () => {
	useEffect(() => {
		// update document title
		document.title = 'My Notes - Notedly';
	});

	const { loading, error, data } = useQuery(GET_MY_NOTES);

	// if the data is loading, show a loading message
	if (loading) return 'Loading...';
	// if thete is an error fetching 
	if (error) return 'Error! ${error.message}';
	// if the query is successful and there are notes, return the feed of notes
	// else if the query is success and there are no notes, display message
	if (data.me.notes.length !==0) {
		return <NoteFeed notes={data.me.notes} />;
	} else {
		return <p>No notes yet</p>;
	}
		
};

export default MyNotes;