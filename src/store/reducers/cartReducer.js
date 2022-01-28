import { cartTypes } from "../actionTypes";

const cartReducer = (state = {}, action) => {
	const { payload } = action;

	switch (action.type) {
		case cartTypes.delete:
			const copy = { ...state };
			delete copy[action.id];
			return copy;
		case cartTypes.loadOne:
			const { id, ...data } = payload;
			return { ...state, [id]: data };
		case cartTypes.loadAll:
			return payload.reduce((acc, cart) => {
				const { id, ...data } = cart;
				acc[id] = data;
				return acc;
			}, {});
		default:
			return state;
	}
};

export default cartReducer;
