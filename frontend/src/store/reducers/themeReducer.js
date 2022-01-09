import { themeTypes } from "../actionTypes";

const initialState = {
	isDark: true
};

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case themeTypes.toggle:
			return { ...state, isDark: !state.isDark }
		default:
			return state;
	}
};

export default themeReducer;
