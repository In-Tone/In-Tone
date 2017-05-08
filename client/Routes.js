import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AudioInput from './components/AudioInput';

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path='/' component={AudioInput} />
		</Router>
	)
}

export default Routes;