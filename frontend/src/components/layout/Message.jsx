import { useDispatch } from "react-redux";
import messageActions from "../../store/actions/messageActions";

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
		<div>
			<p className={type}>{text}</p>
			<button onClick={clearMessage}>Delete</button>
		</div>
	);
};

export default Message;
