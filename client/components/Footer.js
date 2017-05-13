'use strict'
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';


import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import SkyLight from 'react-skylight';

import store from '../store';
import {fetchTargets} from '../reducers/Targets';

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
			<footer className="col-xs-12" style={styles.footer}>
					<FlatButton onClick={() => this.refs.tonalLanguages.show()} className="col-xs-4" style={styles.button}>What are Tonal Languages?</FlatButton>
						<SkyLight dialogStyles={styles.myDialog} hideOnOverlayClicked ref="tonalLanguages" title="What are Tonal Languages?">
							Tonal languages use pitch to distinguish a word's meaning. Depending on the pitch, the same syllable could mean two totally different things! For example, in Thai, <i>ma</i> spoken in a high tone would mean <i>horse</i> and in a rising tone would mean <i>dog</i>. For people who don't speak tonal languages, these tones are hard to perceive and reproduce.
						</SkyLight>
					<FlatButton onClick={() => this.refs.howItWorks.show()} className="col-xs-4" style={styles.button}>How In-Tone Works</FlatButton>
					<SkyLight  dialogStyles={styles.myDialog} hideOnOverlayClicked ref="howItWorks" title="How In-Tone Works">
          	In-Tone helps you perceive and reproduce a language's tones. You are given a series of vocabulary flashcards with audio of the word being spoken by a native speaker. You can then record yourself saying the word, and In-Tone will provide you with a graph comparing the target's pitch values alongside your own.
						<br />
						<RaisedButton
							label='Train Now'
							labelStyle={{fontSize: '24px'}}
							onClick={() => {
								console.log('this: ', this)
								this.refs.train.show()
							}}
							style={styles.modalButton} />
						<SkyLight dialogStyles={styles.myDialog} hideOnOverlayClicked ref="train" title="Choose a Language:">
							<div style={styles.buttonSection}>
								<RaisedButton label='Mandarin' labelStyle={{fontSize: '24px'}} style={styles.modalButton} />
								<RaisedButton
									label='Thai'
									labelStyle={{fontSize: '24px'}}
									ref={(button) => {this.thaiButton = button;}}
									onClick={() => {
										console.log('this inside Thai click: ', this)
										this.refs.mode.show()
										this.onLanguageClick(this.thaiButton)
										console.log('this after eventHandler: ', this)
									}} />
								<RaisedButton label='Hmong' labelStyle={{fontSize: '24px'}} style={styles.modalButton} />
							</div>
						</SkyLight>
        	</SkyLight>
					<SkyLight dialogStyles={styles.myDialog} hideOnOverlayClicked ref="mode" title="Choose a Training Mode:">
						<div style={styles.buttonSection}>
							<RaisedButton label='Play' labelStyle={{fontSize: '24px'}} style={styles.modalButton} />
							{/* need to change Study button to link to Study but study right now is broken. Need to set the modal to be invisible once this is clicked*/}
							<Link to='/study'> <RaisedButton
								label='Study'
								labelStyle={{fontSize: '24px'}}
								onClick={() => {
								this.refs.howItWorks.hide()
								this.refs.mode.hide()
								this.refs.train.hide()
								console.log('this inside Study click: ', this)
								}}
							style={styles.modalButton}/></Link>
						</div>
					</SkyLight>
					<FlatButton onClick={() => {
						console.log('this inside Train button: ', this)
						this.refs.train.show()
					}}  className="col-xs-4" style={styles.button}>Train</FlatButton>
			</footer>
		)
	}
}



const styles = {
	footer: {
		height: '100px',
		backgroundColor: 'purple',
		position: 'fixed',
		bottom: '0',
	},
	button: {
		fontSize: '24px',
		color: 'white',
		display: 'in-line',
		height: '100%',
	},
	modalButton: {
		color: 'white',
		margin: '30px',

	},
	buttonSection: {
		marginTop: '40px',
		// paddingTop: '30px'
	},
	myDialog: {
	// backgroundColor: '#00897B',
		backgroundColor: 'rgba(0, 137, 123, 1)',
		color: '#ffffff',
		width: '70%',
		height: '450px',
		marginTop: '-300px',
		marginLeft: '-35%',
		fontSize: '28px',
		padding: '50px',
	}
}

const mapDispatchToProps = {fetchTargets};

export default connect(null, mapDispatchToProps)(Footer);
