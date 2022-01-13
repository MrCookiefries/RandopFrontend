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

	// product calls
	static async getProductById(id) {
		return await this.request(`products/${id}`);
	}

	static async getProducts(limit = 10, offset) {
		return await this.request(`products`, { limit, offset });
	}

	// user calls
	static async login(credentials) {
		return await this.request(`auth`, credentials, "POST");
	}

	static async register(newUser) {
		return await this.request(`users`, newUser, "POST");
	}
}

export default Api;
