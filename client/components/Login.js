import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {login, logout} from '../reducers/Auth';
import {connect} from 'react-redux';

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
    <RaisedButton label="Logout" onClick={logout}/>
  </div>
</div>
)

export default connect(
  state => ({}),
  {login, logout},
)(Login)
