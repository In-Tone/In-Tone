import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const ChooseLanguage = (props) => {
	return (
		<div>
			<Paper zDepth={1} style={styles.paper}>
				<div style={styles.buttonSection}>
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
			</Paper>
		</div>
	)
}

export default ChooseLanguage

const styles = {
	modalButton: {
		margin: '30px',
	},
	buttonSection: {
		paddingTop: '80px',
	},
	paper: {
		marginTop: '10px'
	}
}
