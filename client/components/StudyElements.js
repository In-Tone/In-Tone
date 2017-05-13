import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

// matches transliteration stored in the database to unicode represetation of thai character
const thaiLexicon = {
	'ch\u00CC': '\u0E43\u0E0A\u0E48', 									// falling chai
	'\u0127\u00EE': '\u0E43\u0E2B\u0E49', 							// falling hai
	'ch\u00CE': '\u0E43\u0E0A\u0E49', 									// hight chai
	'\u0177\u0101y': '\u0E22\u0E49\u0E45\u0E22', 				// high yai
	'l\u0300\u0127\u1ECB': '\u0E44\u0E2B\u0E25\u0E48',	// low lhai
	'm\u0300\u0127I': '\u0E43\u0E2B\u0E21\u0E48', 			// low mai
	'kl\u1ECB': '\u0E44\u0E01\u0E25', 									// mid klai
	'p\u1ECB': '\u0E44\u0E1B', 													// mid pai
	'n\u0127\u1ECB': '\u0E44\u0E2B\u0E19', 							// rising nhai
	'sI': '\u0E43\u0E2A'																// rising sai
};

const nativeSpellingStyle = {
	fontSize: 75,
}

export const targetWord = (image, transliteration, englishTranslation, tone) => (
	<Paper zDepth={1}>
		<h1 style={nativeSpellingStyle}>{thaiLexicon[transliteration]}</h1>
		<h1>Transliteration: {transliteration}</h1>
		<h2>English Translations: {englishTranslation}</h2>
		<h2>Tone: {tone}</h2>
	</Paper>
);

export const button = (label, onClickFunc) => (
	<RaisedButton label={label} onClick={onClickFunc} />
);
