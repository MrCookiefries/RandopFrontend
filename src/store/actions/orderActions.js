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
	loadAll: orders => ({
		type: orderTypes.loadAll, payload: orders
	}),
	fetchAll: (limit = 25, offset) => async dispatch => {
		const resp = await Api.getOrders(limit, offset);
		if (!resp) return;
		dispatch(orderActions.loadAll(resp.orders));
	}
};

export default orderActions;
