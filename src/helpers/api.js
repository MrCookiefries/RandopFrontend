import axios from "axios";
import handleAxiosError from "./handleAxiosError";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Api {
	// bearer token
	static token;

	// generic axios request builder & maker
	static async request(endpoint, data = {}, method = "GET") {
		const url = `${baseUrl}/${endpoint}`;
		const headers = { Authorization: `Bearer ${this.token}` };
		const params = method === "GET" ? data : {};

		try {
			const resp = await axios({ url, method, data, params, headers });
			return resp.data;
		} catch (err) {
			handleAxiosError(err);
		}
	}

	// cart calls
	static async getCarts() {
		return await this.request(`carts`);
	}

	static async deleteCartById(id) {
		return await this.request(`carts/${id}`, {}, "DELETE");
	}

	static async createCart() {
		return await this.request(`carts`, {}, "POST");
	}

	// cart item calls
	static async getCartItems(cartId) {
		return await this.request(`cartItems/${cartId}`);
	}

	static async createCartItem(newCartItem) {
		return await this.request(`cartItems`, newCartItem, "POST");
	}

	static async updateCartItem(cartItemVals) {
		return await this.request(`cartItems`, cartItemVals, "PATCH");
	}

	static async deleteCartItemById(cartId, productId) {
		return await this.request(
			`cartItems/${cartId}/${productId}`, {}, "DELETE"
		);
	}

	// product calls
	static async getProductById(id) {
		return await this.request(`products/${id}`);
	}

	static async getProducts(limit, offset) {
		return await this.request(`products`, { limit, offset });
	}

	static async getProductsByIds(ids) {
		return await this.request(`products/getByIds`, { ids }, "POST");
	}

	static async createProduct(newProduct) {
		return await this.request(`products`, newProduct, "POST");
	}

	static async updateProduct(id, newVals) {
		return await this.request(`products/${id}`, newVals, "PATCH");
	}

	static async deleteProduct(id) {
		return await this.request(`products/${id}`, {}, "DELETE");
	}

	// user calls
	static async login(credentials) {
		return await this.request(`auth`, credentials, "POST");
	}

	static async register(newUser) {
		return await this.request(`users`, newUser, "POST");
	}

	static async getUserById(userId) {
		return await this.request(`users/${userId}`);
	}

	// customer calls
	static async createCustomer({ name, email }) {
		return await this.request(`customers`, { name, email }, "POST");
	}

	// payment calls
	static async createPayment(items) {
		return await this.request(`payments`, { items }, "POST");
	}

	// order calls
	static async placeOrder(cartId) {
		return await this.request(`orders/${cartId}`, {}, "POST");
	}

	static async getOrders(limit, offset) {
		return await this.request(`orders`, { limit, offset });
	}
}

export default Api;
