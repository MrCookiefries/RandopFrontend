import { userTypes } from "../actionTypes";
import { getSavedToken, saveToken } from "../../helpers/token";

const initialState = { token: getSavedToken() };

const userReducer = (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {
		case userTypes.load:
			const { token } = action;
			payload.token = token;
			saveToken(token);
			return payload;
		default:
			return state;
	}
};

export default userReducer;
