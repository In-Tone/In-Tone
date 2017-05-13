'use strict'

export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY';

export const setModalVisibility = bool => ({
	type: SET_MODAL_VISIBILITY,
	modalVisible: bool
});

const reducer = (state = true, action) => {
	switch(action.type) {
		case SET_MODAL_VISIBILITY:
			return action.modalVisible;
		default:
			return state;
	}
};

export default reducer;
