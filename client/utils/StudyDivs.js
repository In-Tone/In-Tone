import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export const targetWord = (image, transliteration, englishTranslation, tone) => (
	<Paper zDepth={1}>
		<img src={image} />
		<h1>Transliteration: {transliteration}</h1>
		<h2>English Translations: {englishTranslation}</h2>
		<h2>Tone: {tone}</h2>
	</Paper>
);

export const button = (label, onClickFunc) => (
	<RaisedButton label={label} onClick={onClickFunc} />
);
