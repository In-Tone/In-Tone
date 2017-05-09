import React from 'react';
import Navbar from './Navbar'

const Layout = ({children}) => (
	<div>
		<Navbar />
		{ children }
	</div>
	)

export default Layout;
