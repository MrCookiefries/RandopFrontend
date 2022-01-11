import createMessage from "./createMessage";

// take care of caught errors when making Axios requests
const handleAxiosError = err => {
	if (err.response) {
		const { error: { message, statusCode } } = err.response.data;
		console.error(statusCode, message);
		createMessage({ text: message, type: "error", clearSeconds: 6000 });
	} else {
		console.error(err);
	}
};

export default handleAxiosError;
