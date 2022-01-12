import { userTypes } from "../actionTypes";
import { getSavedToken, removeToken, saveToken } from "../../helpers/token";

const initialState = { token: getSavedToken() };

const userReducer = (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {
		case userTypes.load:
			const { token } = action;
			payload.token = token;
			saveToken(token);
			return payload;
		case userTypes.logout:
			removeToken();
			return {};
		default:
			return state;
	}
};

export default userReducer;
