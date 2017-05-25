'use strict';

// react
import React from 'react';

const browserCompatible = () => (
	<p>Your browser supports Web Audio! If, however, you do not have access to certain features of our app, please browse with Firefox or Chrome version 58 or higher.</p>
);

const browserIncompatible = () => (
	<p>Unfortunately, your browser does not support all the features of our app. Please use Firefox or Chrome version 49 or higher</p>
);

export const compatibilityFlag = () => {
	if (Modernizr.bloburls && Modernizr.webaudio) return browserCompatible();
	else return browserIncompatible();
};