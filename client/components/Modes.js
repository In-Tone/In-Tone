import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const play = {
  margin: 12,
  height: '200px',
  width: '1800px',
  display: 'inline',
};

const study = {
  margin: 12,
  height: '200px',
  width: '1800px',
  display: 'inline',
  color: 'blue'
};

const demo = {
  margin: 12,
  height: '200px',
  width: '1800px',
  display: 'inline',
  color: 'green'
};

const button = (label, toggleFunction, style, routeDestination) => {
	return (
		<Link to={routeDestination}>
			<RaisedButton label={label} buttonStyle={style}/>
		</Link>
	)
}

const Modes = () => (
	<div>
		<div id="modes-container">
	    {button('PLAY', null, play, "play")}
	    {button('STUDY', null, study, "study")}
	    {button('DEMO', null, demo, "demo")}
		</div>
	</div>
	)

export default Modes;