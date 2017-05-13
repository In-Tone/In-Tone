import axios from 'axios';
import { processTargetData } from '../utils/ProcessTargetData';

export const SET_TARGETS = 'SET_TARGETS';

export const setTargets = (allTargets) => ({
	type: SET_TARGETS,
	allTargets
});

export const fetchTargets = (language) => 
	dispatch => {
		axios.get(`api/targets/${language}`)
			.then(res => {
				return processTargetData(res);
			})
			.then(allTargets => {
				dispatch(setTargets(allTargets));
			})
			.catch(err => console.error(err));
};

const reducer = (state=[], action) => {
	switch(action.type) {
		case SET_TARGETS:
			return action.allTargets;
		default:
			return state;
	}
};

export default reducer;
