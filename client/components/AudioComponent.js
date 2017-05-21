'use strict';
// react
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			audioType: 'Target Audio: '
		};
	}

	render(){
		return(
			<div id='soundClips' style={{padding: '2% 0 3% 0'}}>
				<div style={styles.audioStyles}>
					<h4>Target Audio: </h4>
					<audio controls id='soundSample' src={this.props.wav} style={{width: '50%'}}/>
				</div>
				<div style={styles.audioStyles}>
					<h4>User Audio: </h4>
					<audio controls id='clip' src={this.props.url} style={{width: '50%'}}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	url: state.url
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AudioComponent);

const styles = {
	audioStyles: {
		display:'flex', 
		justifyContent:'center', 
		paddingBottom:'5%'
	}
};
