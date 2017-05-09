import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AudioInput from './components/AudioInput';
import Study from './components/Study';
import Layout from './components/Layout';

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path='/' component={Layout}>
				<Route path='study' component={Study}/>
			</Route>
		</Router>
	)
}

export default Routes;
