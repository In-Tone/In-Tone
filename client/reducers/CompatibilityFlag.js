'use strict';

export const SET_COMPATIBILITY = 'SET_COMPATIBILITY';

export const setCompatibility = () => ({
	type: SET_COMPATIBILITY,
	value: false
});

// if "true", the compatibility pop-up will appear on loading the home page component
const reducer = (state=true, action) => {
	switch(action.type) {
		case SET_COMPATIBILITY:
			return action.value;
		default:
			return state;
	}
};

export default reducer;
