'use strict';
// react
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SkyLight from 'react-skylight';

// material-ui
import FlatButton from 'material-ui/FlatButton';

// components
import { tonalLanguages, aboutInTone } from './FooterText';

// dispatchers
import { fetchTargets } from '../reducers/Targets';
import { setCompatibility } from '../reducers/CompatibilityFlag';
import { compatibilityFlag } from './CompatibilityText';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.onTonalLanguageClick = this.onTonalLanguageClick.bind(this);
		this.onHowItWorksClick = this.onHowItWorksClick.bind(this);
		this.onTrainClick = this.onTrainClick.bind(this);
	}

	onLanguageClick(button) {
		this.props.setCompatibility();
		const language = button.props.label.toLowerCase();
		this.props.fetchTargets(language);
	}

	onTonalLanguageClick() {
		this.props.setCompatibility();
		this.refs.tonalLanguages.show();
		this.refs.howItWorks.hide();
	}

	onHowItWorksClick() {
		this.props.setCompatibility();
		this.refs.tonalLanguages.hide();
		this.refs.howItWorks.show();
	}

	onTrainClick() {
		this.props.setCompatibility();
		this.refs.tonalLanguages.hide();
		this.refs.howItWorks.hide();
	}

	componentDidMount() {
		if (this.props.compatibilityFlag) this.refs.compatibilityFlag.show();
		else this.refs.compatibilityFlag.hide();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.compatibilityFlag) this.refs.compatibilityFlag.hide();
	}

	componentDidUpdate() {
		if (!this.props.compatibilityFlag) this.refs.compatibilityFlag.hide();
	}

	render() {
		return (
			<footer className="col-xs-12" style={styles.footer}>
				<SkyLight dialogStyles={styles.myDialog} overlayStyles={styles.overlay} hideOnOverlayClicked ref="compatibilityFlag" title="Feature Support">
					{compatibilityFlag()}
				</SkyLight>
				<FlatButton onClick={this.onTonalLanguageClick} className="col-xs-4" style={styles.button} hoverColor={'rgba(156, 39, 176, 0.7)'} >
					What are Tonal Languages?
				</FlatButton>
				<SkyLight dialogStyles={styles.myDialog} overlayStyles={styles.overlay} hideOnOverlayClicked ref="tonalLanguages" title="What are Tonal Languages?">
					{tonalLanguages()}
				</SkyLight>
				<FlatButton onClick={this.onHowItWorksClick} className="col-xs-4" style={styles.middleButton} hoverColor={'rgba(156, 39, 176, 0.7)'}>
					How In-Tone Works
				</FlatButton>
				<SkyLight  dialogStyles={styles.myDialog} overlayStyles={styles.overlay} hideOnOverlayClicked ref="howItWorks" title="How In-Tone Works">
					<div>
						{aboutInTone()}
					</div>
				</SkyLight>
				<Link to='/study'><FlatButton className="col-xs-4" style={styles.button} hoverColor={'rgba(156, 39, 176, 0.7)'} onClick={this.onTrainClick}>Train</FlatButton></Link>
			</footer>
		);
	}
}

const mapStateToProps = state => ({
	compatibilityFlag: state.compatibilityFlag
});

const mapDispatchToProps = {fetchTargets, setCompatibility};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

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
};
