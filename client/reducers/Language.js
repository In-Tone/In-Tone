'use strict'

export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = language => ({
	type: SET_LANGUAGE,
	language
});

const reducer = (state = '', action) => {
	switch(action.type) {
		case SET_LANGUAGE:
			return action.language;
		default:
			return state;
	}
};

export default reducer;
