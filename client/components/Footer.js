'use strict'
import React, {Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
					<FlatButton onClick={() => this.refs.tonalLanguages.show()} className="col-xs-4" style={styles.button} hoverColor={'rgba(156, 39, 176, 0.7)'} >
						What are Tonal Languages?
					</FlatButton>
						<SkyLight dialogStyles={styles.myDialog} overlayStyles={styles.overlay} hideOnOverlayClicked ref="tonalLanguages" title="What are Tonal Languages?">
							<p>Tonal languages use pitch to distinguish a word's meaning. Depending on the pitch, the same syllable could mean two totally different things! For example, in Thai, <i>ma</i> spoken in a high tone would mean <i>horse</i> and in a rising tone would mean <i>dog</i>. For people who don't speak tonal languages, these tones are hard to perceive and reproduce.</p>
						</SkyLight>
					<FlatButton onClick={() => this.refs.howItWorks.show()} className="col-xs-4" style={styles.middleButton} hoverColor={'rgba(156, 39, 176, 0.7)'}>
						How In-Tone Works
					</FlatButton>
					<SkyLight  dialogStyles={styles.myDialog} overlayStyles={styles.overlay} hideOnOverlayClicked ref="howItWorks" title="How In-Tone Works">
						<div>
							<p>In-Tone helps you perceive and reproduce a language's tones. You are given a series of vocabulary flashcards with audio of the word being spoken by a native speaker. You can then record yourself saying the word, and In-Tone will provide you with a graph comparing the target's pitch values alongside your own.</p>
						</div>
        	</SkyLight>
					<Link to='/study'><FlatButton className="col-xs-4" style={styles.button} hoverColor={'rgba(156, 39, 176, 0.7)'}>Train</FlatButton></Link>
			</footer>
		)
	}
}


const styles = {
	footer: {
		height: '55px',
		backgroundColor: 'purple',
		position: 'fixed',
		bottom: '0',
		zIndex: 500
	},
	button: {
		fontSize: '24px',
		color: 'white',
		display: 'in-line',
		height: '100%',
	},
	middleButton: {
		fontSize: '24px',
		color: 'white',
		display: 'in-line',
		height: '100%',
		borderLeft: 'medium solid white',
		borderRight: 'medium solid white'
	},
	modalButton: {
		color: 'white',
		margin: '30px',
	},
	buttonSection: {
		marginTop: '40px',
	},
	myDialog: {
		backgroundColor: 'rgba(0, 137, 123, 1)',
		color: '#ffffff',
		width: '70%',
		height: '320px',
		fontSize: '20px',
		paddingTop: '50px',
		paddingLeft: '75px',
		paddingRight: '75px',
		position: 'fixed',
		zIndex: 500,
    lineHeight: '32px',
    // vertical alignment
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
	},
	overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
}

const mapDispatchToProps = {fetchTargets};

export default connect(null, mapDispatchToProps)(Footer);
