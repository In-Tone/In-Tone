'use strict'

import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';



export default class TonalDialog extends Component {

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

    return (
      <div>
        <RaisedButton label="What are Tonal Languages?" onClick={() => this.handleOpen()} />
        <Dialog
          title="What are Tonal Languages?"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Tonal languages use pitch to distinguish a word's meaning. Depending on the pitch, the same syllable could mean two totally different things! For example, in Thai, <i>ma</i> spoken in a high tone would mean <i>horse</i> and in a rising tone would mean <i>dog</i>. For people who don't speak tonal languages, these tones are hard to perceive and reproduce.</p>
        </Dialog>
      </div>
    );
  }
}

const styles ={

}
