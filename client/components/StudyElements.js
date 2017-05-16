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
	fontSize: 85
}

export const targetWord = (image=null, transliteration=null, englishTranslation=null, tone=null) => (
	// w/o a border, the Paper renders in study with uneditable padding on top. Defining a porder seems to fix it 
	<Paper zDepth={1} style={{borderStyle:'solid', borderColor:'white'}}>
		<h1 style={nativeSpellingStyle} className='studyDefinitions'>{thaiLexicon[transliteration]}</h1>
		<h4 className='studyDefinitions'>Transliteration: {transliteration}</h4>
		<h4 className='studyDefinitions'>English Translation: {englishTranslation}</h4>
		<h4 className='studyDefinitions'>Tone: {tone}</h4>
	</Paper>
);

export const button = (label, onClickFunc) => (
	<RaisedButton label={label} labelStyle={{fontSize: '15px'}} onClick={onClickFunc} className='studyButtons' />
);
