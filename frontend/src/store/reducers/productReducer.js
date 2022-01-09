import { productTypes } from "../actionTypes";

const productReducer = (state = {}, action) => {
	const { payload, id } = action;
	const stateCopy = { ...state };

	switch (action.type) {
		case productTypes.add:
		case productTypes.update:
		case productTypes.loadOne:
			return { ...state, payload };
		case productTypes.loadMany:
			return {
				...state, ...payload.reduce((acc, p) => {
					const { id, ...rest } = p;
					acc[id] = rest;
					return acc;
				}, {})
			};
		case productTypes.delete:
			delete stateCopy[id];
			return stateCopy;
		default:
			return state;
	}
};

export default productReducer;
