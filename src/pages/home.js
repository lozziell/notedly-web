import React from 'react';
// import libraries for queries
import { useQuery, gql } from '@apollo/client';

// library to enable markdown notes to be rendered
import ReactMarkdown from 'react-markdown'; 

//import Header from '../components/Header';
//import Navigation from '../components/Navigation';

// import the Link component rfom react-router
//import { Link } from 'react-router-dom';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

// import the query
import { GET_NOTES } from '../gql/query';


{/* MOVED TO QUERY FILE // our graphQl query, stored as a variable
//const GET_NOTES = gql`
	query NoteFeed($cursor: String) {
		noteFeed(cursor: $cursor) {
		    cursor
		    hasNextPage
		    notes {
				id
				createdAt
				content
				favouriteCount
				author {
					username
		        	id
		        	avatar
		    	}
	    	}
  		}
	}
`;*/}

const Home = () => {
	// query hook
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
	
	// if the data is loading, display loading message
	if (loading) return <p>Loading...</p>;
	
	// if there is an error fetching the data, display an error message 
	if (error) return <p>Error!</p>;

	// if the data is successful, display data in UI
	return (
		// add a <React.Fragment> element to provide a parent element
		<React.Fragment>
			<NoteFeed notes={data.noteFeed.notes} />
			{/*Only display the Load More Button if hasNextPage is true */}
			{data.noteFeed.hasNextPage && (
				// onclick perform a query passing the current cursor as a variable
				<Button
					onClick={() =>
						fetchMore({
							variables: {
								cursor: data.noteFeed.cursor
							},
							updateQuery: (previousResult, { fetchMoreResult }) => {
								return {
									noteFeed: {
										cursor: fetchMoreResult.noteFeed.cursor,
										hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
										//combine the new results and the old
										notes: [
											...previousResult.noteFeed.notes,
											...fetchMoreResult.noteFeed.notes
										],
										_typename: 'noteFeed'
									}
								};
							}
						})
					}
				>
					Load more
				</Button>
			)}


		</React.Fragment>
	);

};
				

	// previous page displayed
	//return (
		//<div>
			//<p>This is the home page</p>
			//<Button>Click me!</Button>			
		//</div>
	//);

export default Home;