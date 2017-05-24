'use strict';
// testing libraries
import { expect } from 'chai';

// action creators and dispatchers
import { setBlob } from '../../reducers/BestBlob';

describe ('BestBlob', function() {

	it('should create an action for setting a blob', function() {

		const bestBlob = [0,1,2,3,4];
		const expectedAction = {
			type: 'SET_BLOB',
			bestBlob
		};

		expect(setBlob(bestBlob)).to.be.deep.equal(expectedAction);

	});

});