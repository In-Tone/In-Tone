'use strict'

import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import LanguageDialog from './LanguageDialog'

export default class HowItWorksDialog extends Component {

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

	handleClose() {
		this.setState({open: false});
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
			<FlatButton
				label="Thai"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleClose}
			/>,
		]

    return (
      <div style={styles.dialog}>
        <RaisedButton label="Train Now" onClick={() => this.handleOpen()} />
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
