import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {login, logout} from '../reducers/Auth';
import {connect} from 'react-redux';

const Login = ({ login, logout }) => (
  <div style={styles.loginSignup}>
  <div style={styles.form}>
    <h1>Please log in</h1>
    <form 
      onSubmit={evt => {
        evt.preventDefault()
        login(evt.target.email.value, evt.target.password.value)
      }}
    >
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
      <RaisedButton type="submit" label="Login" backgroundColor='#3C3970' labelColor='white' style={styles.submit} />
    </form>
  </div>
  </div>
)

const styles = {
/*  button: {
    margin: 12,
  },*/
  submit: {
    margin: 12
  },
  form: {
    margin: 0,
    padding: '10vh 0 10vh 0',
    backgroundColor: 'white',
    /*width, style, color*/
    border: 'medium inset black'
  },
  loginSignup: {
  textAlign: 'center',
  padding: '21vh 25% 50vh 25%',
  }
};

export default connect(
  state => ({}),
  {login, logout},
)(Login)
