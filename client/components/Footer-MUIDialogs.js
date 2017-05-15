'use strict'


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'

import store from '../store';
import {fetchTargets} from '../reducers/Targets';
import TonalDialog from './TonalDialog';
import HowItWorksDialog from './HowItWorksDialog.js';
import TrainDialog from './TrainDialog';

class Footer extends Component {
	constructor(props) {
		super(props)
	}

	onLanguageClick(button) {
		const language = button.props.label.toLowerCase();
		this.props.fetchTargets(language)
	}


	render() {
		return (
			<footer style={styles.footer}>
				<TonalDialog style={styles.button}  />
				<HowItWorksDialog style={styles.button} />
				<TrainDialog style={styles.button} />
			</footer>
		)
	}
}



const styles = {
	footer: {
		height: '65px',
		width: '100%',
		backgroundColor: 'purple',
		position: 'fixed',
		bottom: '0',
		textAlign: 'center'
	},
	buttonSection: {
		display: 'inline'
	},
	button: {
		display: 'inline-block'
	}
}

const mapDispatchToProps = {fetchTargets};

export default connect(null, mapDispatchToProps)(Footer);
