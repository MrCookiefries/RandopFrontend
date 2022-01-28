import { cartTypes } from "../actionTypes";
import Api from "../../helpers/api";

const cartActions = {
	delete: id => ({
		type: cartTypes.delete, id
	}),
	remove: id => async dispatch => {
		await Api.deleteCartById(id);
		dispatch(cartActions.delete(id));
	},
	loadOne: newCart => ({
		type: cartTypes.loadOne, payload: newCart
	}),
	create: () => async dispatch => {
		const resp = await Api.createCart();
		if (!resp) return;
		dispatch(cartActions.loadOne(resp.cart));
	},
	loadAll: carts => ({
		type: cartTypes.loadAll, payload: carts
	}),
	fetchAll: () => async dispatch => {
		const resp = await Api.getCarts();
		if (!resp) return;
		dispatch(cartActions.loadAll(resp.carts));
	}
};

export default cartActions;
