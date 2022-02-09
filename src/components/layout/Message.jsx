import { useDispatch } from "react-redux";
import messageActions from "../../store/actions/messageActions";
import { Alert } from "@mui/material";

const Message = ({ id, text, type, clearSeconds }) => {
	const dispatch = useDispatch();
	// track the timer
	let timerId;

	// auto clear the message after time given
	if (clearSeconds) {
		timerId = setTimeout(() => {
			clearMessage();
		}, clearSeconds);
	}

	const clearMessage = () => {
		// clear timeout in case button was clicked before auto clear
		clearTimeout(timerId);
		dispatch(messageActions.delete(id));
	};

	return (
		<Alert
			sx={{ borderRadius: 0, border: 1 }}
			variant="filled"
			severity={type}
			onClose={clearMessage}
		>
			{text}
		</Alert>
	);
};

export default Message;
