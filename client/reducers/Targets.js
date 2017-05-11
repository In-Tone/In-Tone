import axios from 'axios';
import { processTargetData } from '../utils/ProcessTargetData';

export const SET_TARGETS = 'SET_TARGETS';

export const setTargets = (targets) => ({
	type: SET_TARGETS,
	targets
});

export const fetchTargets = (language) =>
	dispatch => {
		axios.get(`api/targets/${language}`)
			.then(res => {
				return processTargetData(res);
			})
			.then(data => {
				dispatch(setTargets(data));
			})
			.catch(err => console.error(err));
};

const reducer = (state=[], action) => {
	switch(action.type) {
		case SET_TARGETS:
			return action.targets;
		default:
			return state;
	}
};

export default reducer;
