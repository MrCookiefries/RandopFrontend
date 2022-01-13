import { userTypes } from "../actionTypes";
import Api from "../../helpers/api";
import { getSavedToken, removeToken, saveToken } from "../../helpers/token";

const userActions = {
	load: (user, token) => {
		saveToken(token);
		return {
			type: userTypes.load, payload: user, token
		};
	},
	login: credentials => async dispatch => {
		const resp = await Api.login(credentials);
		if (!resp) return;
		dispatch(userActions.load(resp.user, resp.token));
	},
	register: (newUser) => async dispatch => {
		const resp = await Api.register(newUser);
		if (!resp) return;
		dispatch(userActions.load(resp.user, resp.token));
	},
	logout: () => {
		removeToken();
		return ({
			type: userTypes.logout
		})
	},
	loadSavedToken: () => {
		const token = getSavedToken();
		return userActions.load({}, token);
	}
};

export default userActions;
