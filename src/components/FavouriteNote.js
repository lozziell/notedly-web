import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVOURITE } from '../gql/mutation';
import { GET_MY_FAVOURITES } from '../gql/query';

const FavouriteNote = props => {
	// store the notes favourite count as a state
	const [count, setCount] = useState(props.favouriteCount);

	// store the notes favourite count as state
	const  [favourited, setFavourited] = useState(
		// check if the note exits in teh user favourites list
		props.me.favourites.filter(note => note.id === props.noteId).length > 0
	);

	const [toggleFavourite] = useMutation(TOGGLE_FAVOURITE, {
		variables: {
			id: props.noteId
		},
		// refetch the get_my_favourites query to update the cache
		refetchQueries: [{ query: GET_MY_FAVOURITES }]
	});
	// if the user has favourited the note, display the option to remove the favourite
	// else display add to favourite
	return (
		<React.Fragment>
			{favourited ? (
				<ButtonAsLink
					onClick={() => {
						toggleFavourite();
						setFavourited(false);
						setCount(count -1);

					}}
				>
					Remove Favourite
				</ButtonAsLink>
			) : (
				<ButtonAsLink
					onClick={() => {
						toggleFavourite();
						setFavourited(true);
						setCount(count +1);
					}}
				>
					Add Favourite
				</ButtonAsLink>
			)}
			: {count}
		</React.Fragment>
	);
};

export default FavouriteNote;