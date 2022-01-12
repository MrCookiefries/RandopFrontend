import { userTypes } from "../actionTypes";
import Api from "../../helpers/api";

const userActions = {
	load: (user, token) => ({
		type: userTypes.load, payload: user, token
	}),
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
	logout: () => ({
		type: userTypes.logout
	})
};

export default userActions;
