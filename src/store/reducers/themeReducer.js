import { themeTypes } from "../actionTypes";

const isDark = window.matchMedia
	&& window.matchMedia("(prefers-color-scheme: dark)").matches;

const initialState = {
	isDark
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
