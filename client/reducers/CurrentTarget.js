import axios from 'axios';

export const SET_CURRENT_TARGET = 'SET_CURRENT_TARGET';

export const setCurrentTarget = (currentTarget) => ({
	type: SET_CURRENT_TARGET,
	currentTarget
});

const reducer = (state={}, action) => {
	switch(action.type) {
		case SET_CURRENT_TARGET:
			return action.currentTarget;
		default:
			return state;
	}
};

export default reducer;
