import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@apollo/client';

// import date format utility
import { format } from 'date-fns';

import styled from 'styled-components';

// import logged in user UI components
import NoteUser from './NoteUser';
//import the IS LOGGED_IN query
import { IS_LOGGED_IN } from '../gql/query';

// keep notes from extending wider than 800px
const StyledNote = styled.article`
	max-width: 800px;
	margin: 0 auto;
`;

// Style the note with metadata
const MetaData = styled.div`
	@media (min-width: 500px) {
	display: flex;
	align-items: top;
	}
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
	padding-right: 1em;
`;

// align useractions to the right of the large screen
const UserActions = styled.div`
	margin-left: auto;
`;

const Note = ({ note }) => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN);
	// if data is loading, displat a laoding message 
	if (loading) return <p>Loading...</p>;
	// if there is an error fetching the data, display an error message
	if (error) return <p>Error!</p>

	return (
		<StyledNote>
			<MetaData>
				<MetaInfo>
					<img
						src={note.author.avatar}
						alt="{note.author.username} avatar"
						height="50px"
					/>
				</MetaInfo>
				<MetaInfo>
					<em>by</em> {note.author.username} <br />
					{format(note.createdAt, 'MMM Do YYYY')}
				</MetaInfo>
				{data.isLoggedIn ? (
					<UserActions>
						<NoteUser note={note} />
					</UserActions>
				) : (
					<UserActions>
						<em>Favourites:</em> {note.favouriteCount}
					</UserActions>
				)}
			</MetaData>
			<ReactMarkdown source={note.content} />
		</StyledNote>
	);
};

export default Note;