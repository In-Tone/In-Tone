'use strict';
// testing libraries
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';

// action creators
import { setToneTypes, fetchToneTypes } from '../../reducers/ToneTypes';

const mockStore = configureMockStore(thunkMiddleware);

describe('ToneTypes', function() {

	// see nock docs about intercepters
	afterEach(() => {
		nock.cleanAll();
	});

	it('should create an action for setting tones by type', function() {

		const toneTypes = [];
		const expectAction = {
			type: 'SET_TONE_TYPES',
			toneTypes
		};

		expect(setToneTypes(toneTypes)).to.be.deep.equal(expectAction);

	});

	it('should fetch tone types and dispatch `SET_TONE_TYPES` action creator', function() {

		const language = 'thai';

		nock(`https://in-tone.herokuapp.com/`)
			.get(`api/targets/${language}/tonetypes`)
			.reply(200, { body: { tonetypes: ['rising'] }});

		const expectedAction = [
			{
				type: 'SET_TONE_TYPES',
				toneTypes: { tonetypes: ['rising'] }
			}
		];
		const store = mockStore({ tonetypes: [] });

		return store.dispatch(fetchToneTypes(language))
			.then(() => {
				expect(store.getActions()).to.be.deep.equal(expectedAction);
			});

	});

});