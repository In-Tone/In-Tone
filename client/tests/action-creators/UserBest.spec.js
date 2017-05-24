'use strict';

// testing libraries
import { expect } from 'chai';

// action creators
import { setUserBest } from '../../reducers/UserBest';

describe('UserBest', function() {

	it('should create an action for setting user best performances', function() {

		const bestAttempts = [];
		const expectedAction = {
			type: 'SET_USER_BEST',
			bestAttempts
		};

		expect(setUserBest(bestAttempts)).to.be.deep.equal(expectedAction);

	});

});