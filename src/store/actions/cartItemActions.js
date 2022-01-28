import { cartItemTypes } from "../actionTypes";
import Api from "../../helpers/api";

const cartItemActions = {
	delete: (cartId, productId) => ({
		type: cartItemTypes.delete, cartId, productId
	}),
	remove: (cartId, productId) => async dispatch => {
		await Api.deleteCartItemById(cartId, productId);
		dispatch(cartItemActions.delete(cartId, productId));
	},
	loadOne: newCartItem => ({
		type: cartItemTypes.loadOne, payload: newCartItem
	}),
	create: newCartItem => async dispatch => {
		const resp = await Api.createCartItem(newCartItem);
		if (!resp) return;
		dispatch(cartItemActions.loadOne(resp.cartItem));
	},
	loadAll: cartItems => ({
		type: cartItemTypes.loadAll, payload: cartItems
	}),
	fetchAll: cartId => async dispatch => {
		const resp = await Api.getCartItems(cartId);
		if (!resp) return;
		dispatch(cartItemActions.loadAll(resp.cartItems));
	},
	update: cartItemVals => async dispatch => {
		const resp = await Api.updateCartItem(cartItemVals);
		if (!resp) return;
		dispatch(cartItemActions.loadOne(resp.cartItem));
	}
};

export default cartItemActions;
