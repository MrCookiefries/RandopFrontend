import { productTypes } from "../actionTypes";
import Api from "../../helpers/api";

const productActions = {
	delete: id => ({
		type: productTypes.delete, id
	}),
	loadOne: product => ({
		type: productTypes.loadOne, payload: product
	}),
	loadMany: products => ({
		type: productTypes.loadMany, payload: products
	}),
	loadAll: products => ({
		type: productTypes.loadAll, payload: products
	}),
	fetchOne: (id) => async dispatch => {
		const resp = await Api.getProductById(id);
		if (!resp) return;
		dispatch(productActions.loadOne(resp.product));
	},
	fetchMany: (limit = 10, offset) => async dispatch => {
		const resp = await Api.getProducts(limit, offset);
		if (!resp) return;
		dispatch(productActions.loadMany(resp.products));
	},
	fetchAll: (limit = 10, offset) => async dispatch => {
		const resp = await Api.getProducts(limit, offset);
		if (!resp) return;
		dispatch(productActions.loadAll(resp.products));
	},
	fetchByIds: ids => async dispatch => {
		const resp = await Api.getProductsByIds(ids);
		if (!resp) return;
		dispatch(productActions.loadMany(resp.products));
	},
	create: newProduct => async dispatch => {
		const resp = await Api.createProduct(newProduct);
		if (!resp) return;
		dispatch(productActions.loadOne(resp.product));
	}
};

export default productActions;
