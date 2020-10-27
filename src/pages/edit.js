import React from 'react';
// import GraphQL dependencies
import { useQuery, useMutation, gql } from '@apollo/client';

//import the NoteForm component
import NoteForm from '../components/NoteForm';
// import the query
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
	// store the id found in the url as a variable
	const id = props.match.params.id;

	// define the note query hook, passing the id value as a variable
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

	// fetch current user data
	const { data: userdata } = useQuery(GET_ME);

	// define mutation
	const [editNote] = useMutation(EDIT_NOTE, {
		variables: {
			id
		},
		onCompleted: () => {
			props.history.push(`/note/${id}`);
		}
	});

	//if the data is loading, display a loading message
	if (loading) return <p>Loading...</p>;

	// if there is an error fetching the data, display an error message
	if (error) return <p>Error! Note not found</p>;

	//if the current user is the author of the data
	if (userdata.me.id !== data.note.author.id) {
		return <p>you do not have access to edit this note</p>;
	}
	// pass data to the form component

	return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;