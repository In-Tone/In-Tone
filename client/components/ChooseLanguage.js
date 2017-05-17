import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const ChooseLanguage = (props) => {
  return (
    <div style={styles.container}>
        <div style={styles.content}>
          <h1>Choose a language</h1>
          <h3><i>( more coming soon! )</i></h3>
          <Link to='/study'>
          <img
            style={styles.button}
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1024px-Flag_of_Thailand.svg.png'}
            onClick={() => props.onLanguageClick('thai')} />
          </Link>
          <h4>THAI</h4>
        </div>
    </div>
  )
}


export default ChooseLanguage

const styles = {
	modalButton: {
		margin: '30px',
	},
	container: {
		position: 'relative',
		height: '100vh',
		width: '100%'

	},
	content: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
}
