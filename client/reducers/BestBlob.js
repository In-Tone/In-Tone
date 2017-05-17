'use strict';

export const SET_BLOB = 'SET_BLOB';

export const setBlob = (bestBlob) => ({
	type: SET_BLOB,
	bestBlob
});

const reducer = (state={}, action) => {
	switch(action.type) {
		case SET_BLOB:
			return action.bestBlob;
		default:
			return state;
	}
};

export default reducer;
