'use strict';

// testing libraries
import { expect } from 'chai';

// action creators
import { setTargets } from '../../reducers/Targets';

describe('Targets', function() {

	it('should create an action for setting all targets', function() {

		const allTargets = [{},{}];
		const expectAction = {
			type: 'SET_TARGETS',
			allTargets
		};

		expect(setTargets(allTargets)).to.be.deep.equal(expectAction);
	});

});