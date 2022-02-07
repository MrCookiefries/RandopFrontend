import { orderTypes } from "../actionTypes";

const orderReducer = (state = {}, action) => {
	const { payload } = action;

	switch (action.type) {
		case orderTypes.loadOne:
			const { id, ...data } = payload;
			return { ...state, [id]: data };
		case orderTypes.loadAll:
			return payload.reduce((acc, order) => {
				const { id, ...data } = order;
				acc[id] = data;
				return acc;
			}, {});
		default:
			return state;
	}
};

export default orderReducer;
