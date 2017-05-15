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
    // const actions = [
    //   <FlatButton
    //     label="Train Now"
    //     primary={true}
		// 		// this needs to take you to a new modal with language options
    //     onClick={this.handleClose}
    //   />,
    // ];

    return (
      <div style={styles.dialog}>
        <RaisedButton label="How In-Tone Works" onClick={() => this.handleOpen()} />
        <Dialog
          title="How In-Tone Works"
          // actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
					<p>In-Tone helps you perceive and reproduce a language's tones. You are given a series of vocabulary flashcards with audio of the word being spoken by a native speaker. You can then record yourself saying the word, and In-Tone will provide you with a graph comparing the target's pitch values alongside your own.</p>
					<LanguageDialog />
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
