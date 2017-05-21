'use strict';
// react
import React from 'react';
import { connect } from 'react-redux';

// material-ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// dispatchers
import { login } from '../reducers/Auth';

// utilities
import axios from 'axios';

const addNewUser = (userInfo) => (
	axios.post( '/api/login/signup', userInfo)
		.then(res => res.data)
		.catch(err => console.error(err))
);

export const SignUp = ({login}) => {
	const onSubmit = (evt) => {
		const email = evt.target.email.value;
		const username = evt.target.username.value;
		const password = evt.target.password.value;
		const rank = 0;
		evt.preventDefault();
		addNewUser({
			email,
			username,
			password,
			rank
		})
			.then(() => login(email, password))
			.catch(err => console.error(err));
	};

	return (
		<div className='container text-center'>
			<div id="login-signup">
				<h1>Sign up</h1>
				<form onSubmit={onSubmit}>
					<TextField
						hintText="username"
						name="username"
						type="username"
					/>
					<br />
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
					<RaisedButton type="submit" label="Submit" backgroundColor='#3C3970' labelColor='white' style={{marginRight: '20px'}} />
				</form>
			</div>
		</div>
	);
};

const mapDispatchToProps = {login};

export default connect(null, mapDispatchToProps)(SignUp);
