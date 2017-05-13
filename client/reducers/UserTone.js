'use strict'

export const SET_USER_TONE = 'SET_USER_TONE';

export const setUserTone = tones => ({
	type: SET_USER_TONE,
	tones
});

const reducer = (state = [], action) => {
	console.log(action);
	switch(action.type) {
		case SET_USER_TONE:
			return action.tones;
		default:
			return state;
	}
};

export default reducer;
