import { userTypes } from "../actionTypes";

const userReducer = (state = {}, action) => {
	const { payload } = action;

	switch (action.type) {
		case userTypes.load:
			const { token } = action;
			payload.token = token;
			return payload;
		case userTypes.logout:
			return {};
		default:
			return state;
	}
};

export default userReducer;
