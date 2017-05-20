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
		addNewUser({
			email,
			username,
			password,
			rank
		})
			.then(() => login(email, password))
			.catch(err => console.error(err))
	}

	return (
		<div style={styles.loginSignup}>
			<div style={styles.form}>
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
					<RaisedButton type="submit" label="Submit" backgroundColor='#3C3970' labelColor='white' style={styles.submit} />
				</form>
			</div>
		</div>
	)
}

const styles = {
	form: {
		margin: 0,
    padding: '5vh 0 7vh 0',
		backgroundColor: 'white',
		/*width, style, color*/
		border: 'medium inset black'
	},
  loginSignup: {
	  textAlign: 'center',
  	padding: '21vh 25% 50vh 25%',
  },
   submit: {
    margin: 12
  },
}

const mapDispatchToProps = {login}

export default connect(null, mapDispatchToProps)(SignUp);
