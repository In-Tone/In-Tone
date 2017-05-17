import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const ChooseLanguage = (props) => {
	return (
		<div style={styles.container}>
				<div style={styles.content}>
					<h1>Choose a language</h1>
					<h2>(more coming soon!)</h2>
					<RaisedButton
						style={styles.modalButton}
						label='Thai'
						labelStyle={{ fontSize: '24px' }}
						onClick={() => {
							props.onLanguageClick("thai")
						}} />

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
