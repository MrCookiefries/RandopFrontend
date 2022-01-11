import { messageTypes } from "../actionTypes";

const messageActions = {
	add: message => ({ type: messageTypes.add, payload: message }),
	delete: id => ({ type: messageTypes.delete, id })
};

export default messageActions;
