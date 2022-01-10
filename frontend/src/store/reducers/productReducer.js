import { productTypes } from "../actionTypes";

const productReducer = (state = {}, action) => {
	const { payload } = action;

	switch (action.type) {
		case productTypes.add:
		case productTypes.update:
		case productTypes.loadOne:
			const { id, ...details } = payload;
			return { ...state, [id]: details };
		case productTypes.loadMany:
			// previous state overrides new state
			// to prevent details from being lost with loading one
			return {
				...payload.reduce((acc, p) => {
					const { id, ...rest } = p;
					acc[id] = rest;
					return acc;
				}, {}), ...state
			};
		case productTypes.delete:
			const copy = { ...state };
			delete copy[action.id];
			return copy;
		default:
			return state;
	}
};

export default productReducer;
