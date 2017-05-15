'use strict'

// Action Type
export const SET_USER_URL = 'SET_USER_URL';

// Action Creator
export const setUserURL = url => ({
	type: SET_USER_URL,
	url
})

// Reducer
const reducer = (state = '', action) => {
	switch(action.type){
		case SET_USER_URL:
			return action.url
		default:
			return state
	}
}

export default reducer;