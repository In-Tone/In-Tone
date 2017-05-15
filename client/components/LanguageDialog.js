'use strict'

import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {fetchTargets} from '../reducers/Targets';
import store from '../store';


 class LanguageDialog extends Component {

	constructor(props) {
		super(props)

		this.state = {
			open: false,
  	};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleOpen() {
			this.setState({open: true});
	};

	handleClose(button) {
		console.log('button', button)
		const language = button.props.label.toLowerCase();
		this.setState({open: false});
		this.props.fetchTargets(language)
	};

  render() {
		const actions = [
			<FlatButton
				label="Mandarin"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Hmong"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleClose}
			/>,
			<Link to="/study"><FlatButton
				label="Thai"
				ref={(button) => {this.thaiButton = button;}}
				primary={true}
				keyboardFocused={true}
				onClick={this.handleClose}
			/></Link>
    ];

		return (
			<div style={styles.dialog}>
				<RaisedButton label="Choose a Language" onClick={() => this.handleOpen()} />
				<Dialog
					title="Choose a Language"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
				</Dialog>
			</div>
		);
	}
}

const styles ={
	dialog: {
		display: 'inline'
	}
}

const mapDispatchToProps = {fetchTargets};

export default connect(null, mapDispatchToProps)(LanguageDialog);
