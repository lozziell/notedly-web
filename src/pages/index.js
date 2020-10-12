// import react and routing dependencies 
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import shared layout component
import Layout from '../components/Layout';

//import routes
import Home from './home';
import MyNotes from './mynotes';
import Favourites from './favourites';

//define routes
const Pages = () => {
	return (
		<Router>
			{/* Wrap our routes within  teh Layout comp */}
			<Layout>
				<Route exact path="/" component={Home} />
				<Route path="/mynotes" component={MyNotes} />
				<Route path="/favourites" component={Favourites} />
			</Layout>
		</Router>
	);
};

export default Pages;