'use strict';
// testing libraries
import { expect } from 'chai';

// action creators
import { setLanguage } from '../../reducers/Language';

describe('Language', function() {

	it('should create an action for setting a language', function(){

		const language = 'thai';
		const expectAction = {
			type: 'SET_LANGUAGE',
			language
		};

		expect(setLanguage(language)).to.be.deep.equal(expectAction);
	});

})