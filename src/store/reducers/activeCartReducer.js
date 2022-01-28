import { activeCartTypes } from "../actionTypes";

const activeCartReducer = (state = null, action) => {
	switch (action.type) {
		case activeCartTypes.set:
			return action.payload;
		default:
			return state;
	}
};

export default activeCartReducer;
