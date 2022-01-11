import axios from "axios";
import { userTypes } from "../actionTypes";
import { baseUrl } from "../../config";
import handleAxiosError from "../../helpers/handleAxiosError";

const userActions = {
	load: (user, token) => ({
		type: userTypes.load, payload: user, token
	}),
	login: credentials => async dispatch => {
		try {
			const resp = await axios({
				method: "POST",
				url: `${baseUrl}/auth/`,
				data: credentials
			});
			const { user, token } = resp.data;
			dispatch(userActions.load(user, token));
		} catch (err) {
			handleAxiosError(err);
		}
	},
	register: (newUser) => async dispatch => {
		try {
			const resp = await axios({
				method: "POST",
				url: `${baseUrl}/users`,
				data: newUser
			});
			const { user, token } = resp.data;
			dispatch(userActions.load(user, token));
		} catch (err) {
			handleAxiosError(err);
		}
	}
};

export default userActions;
