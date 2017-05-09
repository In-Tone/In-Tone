import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AudioInput from './components/AudioInput';
import Study from './components/Study';
import Home from './components/Home';

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path='/' component={AudioInput} />
			<Route name='Home' path='/home' component={Home} />
			<Route name='Study' path='/study' component={Study} />
		</Router>
	)
}

export default Routes;