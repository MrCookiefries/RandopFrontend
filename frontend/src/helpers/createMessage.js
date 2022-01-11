import store from "../store/store";
import { v4 as uuidV4 } from "uuid";
import messageActions from "../store/actions/messageActions";

// creates a message in the store to be displayed as a message component
const createMessage = ({
	id = uuidV4(),
	text = "message",
	type = "alert",
	clearSeconds = 0
}) => {
	const message = { id, text, type, clearSeconds };
	store.dispatch(messageActions.add(message));
};

export default createMessage;
