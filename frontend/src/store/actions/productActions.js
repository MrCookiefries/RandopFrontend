import axios from "axios";
import { productTypes } from "../actionTypes";

const baseUrl = "http://localhost:3001";

const productActions = {
	add: newProduct => ({
		type: productTypes.add, payload: newProduct
	}),
	update: productData => ({
		type: productTypes.update, payload: productData
	}),
	delete: id => ({
		type: productTypes.delete, id
	}),
	loadOne: product => ({
		type: productTypes.loadOne, payload: product
	}),
	loadMany: products => ({
		type: productTypes.loadMany, payload: products
	}),
	fetchMany: (limit = 10, offset) => async dispatch => {
		try {
			const resp = await axios({
				method: "GET",
				url: `${baseUrl}/products`,
				params: { limit, offset }
			});
			const { products } = resp.data;
			dispatch(productActions.loadMany(products));
		} catch (err) {
			console.error(err);
		}
	}
};

export default productActions;
