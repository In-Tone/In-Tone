import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export const targetWord = (image, transliteration, englishTranslation) => (
	<Paper zDepth={1}>
		<img src={image} />
		<h1>{transliteration}</h1>
		<h2>{englishTranslation}</h2>
	</Paper>
);

export const button = (label, onClickFunc) => (
	<RaisedButton label={label} onClick={onClickFunc} />
);