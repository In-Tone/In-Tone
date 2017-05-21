'use strict';
// react
import React from 'react';

// components
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => (
	<div>
		<Navbar />
		{ children }
		<Footer />
	</div>
);

export default Layout;
