const request = require("supertest");

const app = require("./app");
const db = require("./database");

describe("catch errors", () => {
	test("page not found", async () => {
		const resp = await request(app).get("/no-existe");

		expect(resp.statusCode).toBe(404);
	});
});

afterAll(() => {
	db.end();
});
