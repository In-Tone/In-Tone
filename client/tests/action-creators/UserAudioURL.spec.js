'use strict';
// testing libraries
import { expect } from 'chai';

// action creators
import { setUserURL } from '../../reducers/UserAudioURL';

describe('UserAudioURL', function() {

	it('should create an action for setting user audio url', function() {

		const url = '';
		const expectAction = {
			type: 'SET_USER_URL',
			url
		};

		expect(setUserURL(url)).to.be.deep.equal(expectAction);

	});

});