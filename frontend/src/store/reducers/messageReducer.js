import { messageTypes } from "../actionTypes";

const messageReducer = (state = [], action) => {
	switch (action.type) {
		case messageTypes.add:
			return [...state, action.payload];
		case messageTypes.delete:
			return state.filter(msg => msg.id !== action.id);
		default:
			return state;
	}
};

export default messageReducer;
