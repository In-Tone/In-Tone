import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import Routes from './Routes';
import Navbar from './components/Navbar';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
	appBar: {
		color: 'purple'
	}
})

const Main = () => {
	//MuiThemeProvider is a necessary wrapper to get material-ui to work
	return (
  <MuiThemeProvider muiTheme={muiTheme} >
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
