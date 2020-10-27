import { gql } from '@apollo/client';

const EDIT_NOTE = gql`
	mutation updateNote($id: ID!, $content: String!) {
		updateNote(id: $id, content: $content) {
			id
			content
			createdAt
			favouriteCount
			favouritedBy {
				id
				username
			}
			author {
				username
				id
			}
		}
	}
`;

const DELETE_NOTE = gql`
	mutation deleteNote($id: ID!) {
		deleteNote(id: $id)
	}
`;

const TOGGLE_FAVOURITE =gql`
	mutation toggleFavourite($id: ID!) {
		toggleFavourite(id: $id) {
			id
			favouriteCount
		}
	}
`;

export { EDIT_NOTE, DELETE_NOTE, TOGGLE_FAVOURITE };