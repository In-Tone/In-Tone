'use strict'

export const SET_USER_GRAPH = 'SET_USER_GRAPH';

// Action Creator
export const setUserGraph = graph => ({
	type: SET_USER_GRAPH,
	graph
})

// Reducer
const reducer = (state = {}, action) => {
	switch(action.type){
		case SET_USER_GRAPH:
			console.log('action inside graph reducer: ', action)
			return action.graph
		default:
			return state
	}
}

export default reducer;
