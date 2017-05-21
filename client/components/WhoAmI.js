'use strict';
// react
import React from 'react';
import { connect } from 'react-redux';

// dispatchers
import { logout } from '../reducers/Auth';

const WhoAmI = ({ user, logout }) => (
	<div className="whoami">
		<span className="whoami-user-name">{user && user.name}</span>
		<br/>
		<button className="logout" onClick={logout}>Logout</button>
	</div>
);

export default connect(
	({ auth }) => ({ user: auth }),
	{logout},
)(WhoAmI)