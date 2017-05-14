import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AudioInput from './components/AudioInput';
import Study from './components/Study';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path='/' component={Layout}>
				<Route path='login' component={Login}/>
        <Route path='home' component={Home}/>
				<Route path='study' component={Study}/>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	)
}

export default Routes;
