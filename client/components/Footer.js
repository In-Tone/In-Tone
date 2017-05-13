'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import SkyLight from 'react-skylight';

class Footer extends Component {
	constructor() {
		super()

		this.state = {
			modalVisible: false
		}

	}

	render() {
		console.log('refs: ', this.refs)

		var myDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
			fontSize: '28px',
			padding: '50px'
    };

				console.log('Skylight props: ', SkyLight.propTypes)

		return (
			<footer className="col-xs-12" style={styles.footer}>

					<FlatButton onClick={() => this.refs.tonalLanguages.show()} className="col-xs-4" style={styles.button}>What are Tonal Languages?</FlatButton>
					<SkyLight dialogStyles={myDialog} hideOnOverlayClicked ref="tonalLanguages" title="What are Tonal Languages?">
          	Tonal languages use pitch to distinguish a word's meaning. Depending on the pitch, the same syllable could mean two totally different things! For example, in Thai, <i>ma</i> spoken in a high tone would mean <i>horse</i> and in a rising tone would mean <i>dog</i>. For people who don't speak tonal languages, these tones are hard to perceive and reproduce.
        	</SkyLight>
					<FlatButton onClick={() => this.refs.howItWorks.show()} className="col-xs-4" style={styles.button}>How In-Tone Works</FlatButton>
					<SkyLight dialogStyles={myDialog} hideOnOverlayClicked ref="howItWorks" title="How In-Tone Works">
          	In-Tone helps you perceive and reproduce a language's tones. You are given a series of vocabulary flashcards with audio of the word being spoken by a native speaker. You can then record yourself saying the word, and In-Tone will provide you with a graph comparing the target's pitch values alongside your own.
						<br />
						<FlatButton onClick={() => this.refs.train.show()} style={styles.overlayButton}><u>Train Now</u></FlatButton>
						<SkyLight dialogStyles={myDialog} hideOnOverlayClicked ref="train" title="Choose a Language:">
							<div style={styles.buttonSection}>
								<FlatButton style={styles.overlayButton}><u>Mandarin</u></FlatButton>
								<br />
								<FlatButton onClick={() => this.refs.mode.show()} style={styles.overlayButton}><u>Thai</u></FlatButton>
								<br />
								<FlatButton style={styles.overlayButton}><u>Hmong</u></FlatButton>
								<br />
							</div>
						</SkyLight>
        	</SkyLight>
					<SkyLight dialogStyles={myDialog} hideOnOverlayClicked ref="mode" title="Choose a Training Mode:">
						<FlatButton style={styles.overlayButton}><u>Play</u></FlatButton>
						<br />
						{/* need to change Study button to link to Study but study right now is broken*/}
						<Link to='/modes'><FlatButton style={styles.overlayButton}><u>Study</u></FlatButton></Link>
						<br />
					</SkyLight>
					<Link to='/modes'><FlatButton className="col-xs-4" style={styles.button}>Train</FlatButton></Link>
			</footer>
		)
	}
}

export default Footer;

const styles = {
	footer: {
		height: '100px',
		backgroundColor: 'purple',
		position: 'fixed',
		bottom: '0',
	},
	buttonBlock: {
		display: 'block',

	},
	button: {
		fontSize: '24px',
		color: 'white',
		display: 'in-line',
		height: '100%',
	},
	overlayButton: {
		color: 'white',
		marginTop: '20px'
	},
	buttonSection: {
		marginTop: '30px'
	}
}
