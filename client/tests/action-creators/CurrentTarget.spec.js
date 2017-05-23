'use strict';
// testing libraries
import { expect } from 'chai';

// action creators and dispatchers
import { setCurrentTarget } from '../../reducers/CurrentTarget';

describe ('CurrentTarget', function() {

	it('should create an action for setting a target tone', function() {

		const currentTarget = {};
		const expectedAction = {
			type: 'SET_CURRENT_TARGET',
			currentTarget
		};

		expect(setCurrentTarget(currentTarget)).to.be.deep.equal(expectedAction);
	});

});