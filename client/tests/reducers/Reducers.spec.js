import { expect } from 'chai';
import { createStore } from 'redux';

import rootReducer from '../../reducers/index';

describe('Reducers', () => { // need to get rid of native spelling in targets model
	const testUser = {email: 'pim@test.com', id: 2, rank: 1, userName: 'pimmyPim'}
	const testTarget1 = {duration: 600, englishTranslation: 'go', id: 8, pitches: [200, 201, 212, 232, 230, 215, 210, 210, 210, 212, 210]};
	const testTarget2 = {duration: 650, englishTranslation: 'use', id: 3, pitches: [250, 251, 252, 256, 254, 275, 300, 305, 290, 136, 119]};
	const testToneType1 = {id: 2, language: 'thai', tone: 'high'}
	const testToneType2 = {id: 3, language: 'thai', tone: 'falling'}

	const testUserTone1 = {difficulty: 'master', id: 100, isBest: true, pitches: [200, 190, 190, 198, 201, 210, 215, 215, 215, 212, 210], target: testTarget1, toneType: testToneType1, tone_type_id: 2, user: testUser, user_id: 2, wavblob: null}

	const testUserTone2 = {difficulty: 'intermdiate', id: 20, isBest: true, pitches: [230, 235, 232, 230, 220, 225, 230, 230, 215, 212, 210], target: testTarget1, toneType: testToneType2, tone_type_id: 2, user: testUser, user_id: 2, wavblob: null}

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
		const testTargets = [ testTarget1, testTarget2 ];
		it('sets targets in store', () => {
			testStore.dispatch({type: 'SET_TARGETS', allTargets: testTargets});
			const newState = testStore.getState();
			expect(newState.allTargets).to.be.deep.equal(testTargets);
		});
	});

	describe('SET_USER_TONE', () => {
		const testUserTones = [testUserTone1, testUserTone2];

		it('sets user tone attempts in store', () => {
			testStore.dispatch({type: 'SET_USER_TONE', tones: testUserTones});
			const newState = testStore.getState();
			expect(newState.userTones).to.be.deep.equal(testUserTones);
		});
	});


	describe('AUTHENTICATED', () => {;
		it('sets authenticated user in store', () => {
			testStore.dispatch({type: 'AUTHENTICATED', user: testUser});
			const newState = testStore.getState();
			expect(newState.user).to.be.deep.equal(testUser);
		});
	});

	describe('SET_CURRENT_TARGET', () => {
		it('sets current target in store', () => {
			testStore.dispatch({type: 'SET_CURRENT_TARGET', currentTarget: testTarget1});
			const newState = testStore.getState();
			expect(newState.currentTarget).to.be.deep.equal(testTarget1);
		});
	});

	describe('SET_USER_URL', () => {
		const testUrl = 'blob:http://localhost:3000/a4ae03b0-3502-4d06-b26f-39aee56fc46d';
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
		const testToneTypes = [testToneType1, testToneType2]
		it('sets tone types in store', () => {
			testStore.dispatch({type: 'SET_TONE_TYPES', toneTypes: testToneTypes});
			const newState = testStore.getState();
			expect(newState.toneTypes).to.be.deep.equal(testToneTypes);
		});
	});

	describe('SET_USER_BEST', () => {
		const testUserBest = [testUserTone1, testUserTone2];
		it('sets user\'s best attempts in store', () => {
			testStore.dispatch({type: 'SET_USER_BEST', bestAttempts: testUserBest});
			const newState = testStore.getState();
			expect(newState.userBest).to.be.deep.equal(testUserBest);
		});
	});

});

