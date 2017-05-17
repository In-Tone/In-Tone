import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import AudioInput from './components/AudioInput';
import Study from './components/Study';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Profile from './components/ProfilePage';
import SignUp from './components/SignUp';

const LoginPage = connect(
  ({ user }) => ({ user: user })
)(
  ({ user, children }) => (
  <div>
    <nav>
      {user ? <Home/> : <Login/>}
    </nav>
    {children}
  </div>
))

const SignUpPage = connect(
  ({ user }) => ({ user: user })
)(
  ({ user, children }) => (
  <div>
    <nav>
      {user ? <Home/> : <SignUp/>}
    </nav>
    {children}
  </div>
))

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path='/' component={Layout}>
				<Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage} />
        <Route path='/home' component={Home}/>
        <Route path='/study' component={Study}/>
				<Route path='/profile' component={Profile}/>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	)
}

export default Routes;
