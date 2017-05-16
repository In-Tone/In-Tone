import axios from 'axios';
import { processTargetData } from '../utils/ProcessTargetData';
import { setLanguage } from './Language';
import { setCurrentTarget } from './CurrentTarget';

export const SET_TARGETS = 'SET_TARGETS';

export const setTargets = (allTargets) => ({
	type: SET_TARGETS,
	allTargets
});

export const shuffle = (a) => {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

export const fetchTargets = (language) => 
	dispatch => {
		axios.get(`api/targets/${language}`)
			.then(res => {
				return processTargetData(res);
			})
			.then(allTargets => {
				var shuffled = shuffle(allTargets);
				dispatch(setTargets(shuffled));
				dispatch(setLanguage(language));
				const currentTarget = allTargets[0];
				dispatch(setCurrentTarget(currentTarget));
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
