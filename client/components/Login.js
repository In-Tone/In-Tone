'use strict';
// react
import React from 'react';
import {connect} from 'react-redux';

// material-ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// dispatchers
import {login, logout} from '../reducers/Auth';

const Login = ({ login, logout }) => (
	<div className='container text-center'>
		<div id="login-signup">
			<h1>Please log in</h1>
			<form onSubmit={evt => {
				evt.preventDefault()
				login(evt.target.email.value, evt.target.password.value)
			} }>
				<TextField
					hintText="email"
					name="email"
				/>
				<br/>
				<TextField
					hintText="password"
					name="password"
					type="password"
				/>
				<br/>
				<RaisedButton type="submit" label="Login" backgroundColor='#3C3970' labelColor='white' style={{marginRight: '20px'}} />
			</form>
		</div>
	</div>
)

export default connect(
	state => ({}),
	{login, logout},
)(Login)

const styles = {
	button: {
		margin: 12,
	},
	exampleImageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0,
	},
};
