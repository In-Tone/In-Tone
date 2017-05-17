'use strict';

import axios from 'axios';

export const SET_TONE_TYPES = 'SET_TONE_TYPES';

export const setToneTypes = toneTypes => ({
	type: SET_TONE_TYPES,
	toneTypes
});

export const fetchToneTypes = (language) => 
	dispatch => {
		axios.get(`/api/targets/${language}/tonetypes`)
			.then(res => res.data)
			.then(toneTypes => dispatch(setToneTypes(toneTypes)))
			.catch(err => console.error(err))
};

const reducer = (state = [], action) => {
	switch(action.type) {
		case SET_TONE_TYPES:
			return action.toneTypes;
		default:
			return state;
	}
};

export default reducer;