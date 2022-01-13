import Api from "./api.js";

export const getSavedToken = () => {
	const token = window.localStorage.getItem("token");
	Api.token = token || undefined;
	return token || undefined;
};

export const saveToken = token => {
	window.localStorage.setItem("token", token || "");
	Api.token = token || undefined;
};

export const removeToken = () => {
	window.localStorage.removeItem("token");
	Api.token = undefined;
};
