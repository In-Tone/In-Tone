import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import axios from 'axios';

import {login} from '../reducers/Auth';

const addNewUser = (userInfo) => (
	axios.post( '/api/login/signup', userInfo)
		.then(res => res.data)
		.catch(err => console.error(err))
)




export const SignUp = ({login}) => {
	const onSubmit = (evt) => {
		const email = evt.target.email.value;
		const username = evt.target.username.value;
		const password = evt.target.password.value;
		const rank = 0;
		evt.preventDefault()
		console.log('inside onSubmit')
		addNewUser({
			email,
			username,
			password,
			rank
		})
			.then(() => login(email, password))
			.then(() => console.log('should be loggedin'))
			.catch(err => console.error(err))
	}

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
	)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
