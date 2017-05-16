'use strict'

export const SET_USER_GRAPH = 'SET_USER_GRAPH';

export const setUserGraph = graph => ({
	type: SET_USER_GRAPH,
	graph
});

const reducer = (state = {}, action) => {
	console.log('action: ', action)
	switch(action.type) {
		case SET_USER_GRAPH:
			return action.graph;
		default:
			return state;
	}
};

export default reducer;
