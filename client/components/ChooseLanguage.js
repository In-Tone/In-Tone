import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const ChooseLanguage = (props) => {

	const x = -50;
	const y = -50;
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
		height: '100vh', // if this were a % it would be a % of the parent elem.
		width: '100%' // the parent elem here has a width so we can do 100%

	},
	content: {
		position: 'absolute',
		top: '50%', // relative to parent
		left: '50%', // relative to parent
		transform: 'translate(-50%, -50%)'
	},
}
