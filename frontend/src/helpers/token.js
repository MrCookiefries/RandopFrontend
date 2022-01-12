import Api from "./api";

export const getSavedToken = () => {
	const token = window.localStorage.getItem("token");
	return token || undefined;
};

export const saveToken = token => {
	window.localStorage.setItem("token", token);
	Api.token = token || undefined;
};
