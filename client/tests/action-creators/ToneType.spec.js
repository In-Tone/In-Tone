'use strict';
// testing libraries
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';

// action creators
import { setToneTypes, fetchToneTypes } from '../../reducers/ToneTypes';

const middleware = [thunkMiddleware]
const mockStore = configureMockStore(middleware);

xdescribe('ToneTypes', function() {

	// nock.disableNetConnect();
	// nock.enableNetConnect('127.0.0.1');

	// see nock docs about intercepters
	afterEach(() => {
		nock.cleanAll();
	});

	const scope = nock(`http://localhost:3000`);
	// const scope = nock(`https://in-tone.herokuapp.com`);

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

		scope
			.get(`/api/targets/${language}/tonetypes`)
			.reply(200, { body: { tonetypes: ['rising'] }});

		const expectedAction = [
			{
				type: 'SET_TONE_TYPES',
				toneTypes: { tonetypes: ['rising'] }
			}
		];
		const store = mockStore({ tonetypes: [] });

		console.log('store:\n', store);
		console.log('\n\n\nstore.dispatch:\n', store.dispatch)
		console.log(store.dispatch(fetchToneTypes(language)));

		const checkedActions = expect(store.getActions()).to.be.deep.equal(expectedAction);

		const actionChecker = new Promise ((resolve, reject) => {
			const actionCreator = store.dispatch(fetchToneTypes(language));
			resolve(checkedActions); 
		});

		actionChecker();


		// store.dispatch(fetchToneTypes(language))
		// 	// .then(() => {
		// expect(store.getActions()).to.be.deep.equal(expectedAction);
			// });

	});

});