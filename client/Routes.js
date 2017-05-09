import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AudioInput from './components/AudioInput';
import Study from './components/Study';

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path='/' component={AudioInput} />
			<Route name='Study' path='/study' component={Study} />
		</Router>
	)
}

export default Routes;