import { expect } from 'chai';
import { createStore } from 'redux';

import rootReducer from '../../reducers/index';

describe('Reducers', () => { // these are initial values, just data types right??
	const initialState = {
		language: '',
		allTargets: [],
		userTones: [],
		user: null,
		currentTarget: {},
		url: '',
		blob: '',
		toneTypes: [],
		userBest: []
	}

	let testStore;

	beforeEach('Create test store and freeze it', () => {
		// console.log('rootreducer', rootReducer)
		testStore = createStore(rootReducer);
		Object.freeze(testStore.getState())
	})

	it('has expected initial state', () => {
		expect(testStore.getState()).to.be.deep.equal(initialState);
	});

	describe('SET_LANGUAGE', () => {
		const testLanguage = 'thai';
		it('sets language to thai in store', () => {
			testStore.dispatch({type: 'SET_LANGUAGE', language: testLanguage});
			const newState = testStore.getState();
			expect(newState.language).to.be.deep.equal(testLanguage);
		});
	});

	describe('SET_TARGETS', () => {
		const testTargets = [{}, {}, {}];
		it('sets targets in store', () => {
			testStore.dispatch({type: 'SET_TARGETS', allTargets: testTargets});
			const newState = testStore.getState();
			expect(newState.allTargets).to.be.deep.equal(testTargets);
		});
	});

	describe('SET_USER_TONE', () => {
		const testTones = [{}, {}, {}, {}];
		it('sets user tone attempts in store', () => {
			testStore.dispatch({type: 'SET_USER_TONE', tones: testTones});
			const newState = testStore.getState();
			expect(newState.userTones).to.be.deep.equal(testTones);
		});
	});


	describe('AUTHENTICATED', () => {
		const testUser = {};
		it('sets authenticated user in store', () => {
			testStore.dispatch({type: 'AUTHENTICATED', user: testUser});
			const newState = testStore.getState();
			expect(newState.user).to.be.deep.equal(testUser);
		});
	});

	describe('SET_CURRENT_TARGET', () => {
		const testTarget = {};
		it('sets current target in store', () => {
			testStore.dispatch({type: 'SET_CURRENT_TARGET', currentTarget: testTarget});
			const newState = testStore.getState();
			expect(newState.currentTarget).to.be.deep.equal(testTarget);
		});
	});

	describe('SET_USER_URL', () => {
		const testUrl = 'in-tone.herokuapp.com';
		it('sets user audio url in store', () => {
			testStore.dispatch({type: 'SET_USER_URL', url: testUrl});
			const newState = testStore.getState();
			expect(newState.url).to.be.deep.equal(testUrl);
		});
	});

	describe('SET_BLOB', () => {
		const testBlob = 'blobbyblob';
		it('sets user audio blob in store', () => {
			testStore.dispatch({type: 'SET_BLOB', bestBlob: testBlob});
			const newState = testStore.getState();
			expect(newState.blob).to.be.deep.equal(testBlob);
		});
	});

	describe('SET_TONE_TYPES', () => {
		const testToneTypes = [{}, {}];
		it('sets tone types in store', () => {
			testStore.dispatch({type: 'SET_TONE_TYPES', toneTypes: testToneTypes});
			const newState = testStore.getState();
			expect(newState.toneTypes).to.be.deep.equal(testToneTypes);
		});
	});

	describe('SET_USER_BEST', () => {
		const testUserBest = [{}, {}, {}, {}];
		it('sets user\'s best attempts in store', () => {
			testStore.dispatch({type: 'SET_USER_BEST', bestAttempts: testUserBest});
			const newState = testStore.getState();
			expect(newState.userBest).to.be.deep.equal(testUserBest);
		});
	});

});

