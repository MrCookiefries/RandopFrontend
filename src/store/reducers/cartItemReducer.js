import { cartItemTypes } from "../actionTypes";

const makeId = ({ cartId, productId }) => `${cartId}/${productId}`;

const cartItemReducer = (state = {}, action) => {
	const { payload } = action;

	switch (action.type) {
		case cartItemTypes.delete:
			const copy = { ...state };
			delete copy[makeId(action)];
			return copy;
		case cartItemTypes.loadOne:
			return { ...state, [makeId(payload)]: payload.quantity };
		case cartItemTypes.loadAll:
			return payload.reduce((acc, cartItem) => {
				acc[makeId(cartItem)] = cartItem.quantity;
				return acc;
			}, {});
		default:
			return state;
	}
};

export default cartItemReducer;
