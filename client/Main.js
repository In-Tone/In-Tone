import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss';

import store from './store';
import Routes from './Routes';

const Main = () => {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	)
}

render(
  <Main />,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);