'use strict';

// testing libraries
import { expect } from 'chai';

// action creators
import { setUserTone } from '../../reducers/UserTone';

describe('UserTone', function() {

	it('should create an action for setting users tones', function() {

		const tones = [];
		const expectedAction = {
			type: 'SET_USER_TONE',
			tones
		};

		expect(setUserTone(tones)).to.be.deep.equal(expectedAction);

	});

});
