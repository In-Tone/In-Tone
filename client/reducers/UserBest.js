'use strict'

import axios from 'axios'

export const SET_USER_BEST = 'SET_USER_BEST';

export const setUserBest = bestAttempts => ({
	type: SET_USER_BEST,
	bestAttempts
});

export const fetchUserBest = userId => (
	dispatch =>
		axios.get(`api/users/${userId}/best`)
			.then( res => res.data)
			.then( bestAttempts => dispatch(setUserBest(bestAttempts)))
	)

const reducer = (state = [], action) => {
	switch(action.type) {
		case SET_USER_BEST:
			return action.bestAttempts;
		default:
			return state;
	}
};

export default reducer;