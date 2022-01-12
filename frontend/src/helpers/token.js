import Api from "./api.js";
console.log(Api);

export const getSavedToken = () => {
	const token = window.localStorage.getItem("token");
	console.log(Api);
	// Api.token = token || undefined;
	return token || undefined;
};

export const saveToken = token => {
	window.localStorage.setItem("token", token);
	console.log(Api);
	Api.token = token || undefined;
};

export const removeToken = () => {
	window.localStorage.removeItem("token");
	Api.token = undefined;
};
