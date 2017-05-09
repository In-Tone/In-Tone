import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store from './store';
import Routes from './Routes';

const Main = () => {
	//MuiThemeProvider is a necessary wrapper to get material-ui to work 
	return (
  <MuiThemeProvider>
			<Provider store={store}>
				<Routes />
			</Provider>
	</MuiThemeProvider>
	)
}

render(
  <Main />,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);