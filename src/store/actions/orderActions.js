import { orderTypes } from "../actionTypes";
import Api from "../../helpers/api";

const orderActions = {
	loadOne: order => ({
		type: orderTypes.loadOne, payload: order
	}),
	place: cartId => async dispatch => {
		const resp = await Api.placeOrder(cartId);
		if (!resp) return;
		dispatch(orderActions.loadOne(resp.order));
	},
	loadMany: orders => ({
		type: orderTypes.loadMany, payload: orders
	}),
	fetchMany: (limit = 25, offset) => async dispatch => {
		const resp = await Api.getOrders(limit, offset);
		if (!resp) return;
		dispatch(orderActions.loadMany(resp.orders));
	}
};

export default orderActions;
