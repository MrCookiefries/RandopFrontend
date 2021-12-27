const {
	commonBeforeAll, commonBeforeEach,
	commonAfterEach, commonAfterAll
} = require("./commonSetups");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const User = require("./User");
const ExpressError = require("../ExpressError");

describe("helpers", () => {
	test("duplicates", async () => {
		// new ID
		await expect(
			User.checkDuplicate("no@mail")
		).resolves.toBeUndefined();
		// already used ID
		await expect(
			User.checkDuplicate("u@1")
		).rejects.toThrowError(ExpressError);
	});
});

const newLogin = {
	email: "test@mail",
	password: "password"
};
const name = "name";

describe("register", () => {
	test("duplicate", async () => {
		await expect(
			User.register({ ...newLogin, name, email: "u@1" })
		).rejects.toThrowError(ExpressError);
	});

	test("new account", async () => {
		const user = await User.register({ ...newLogin, name });

		expect(user).toEqual(expect.objectContaining({
			email: newLogin.email,
			name,
			isAdmin: false,
			id: expect.any(Number),
		}));
	});
});

describe("login", () => {
	test("not found", async () => {
		await expect(
			User.login({ ...newLogin })
		).rejects.toThrowError(ExpressError);
	});

	test("wrong password", async () => {
		await expect(
			User.login({ email: "u@1", password: "wrong" })
		).rejects.toThrowError(ExpressError);
	});

	test("right password", async () => {
		const credentials = { email: "u@1", password: "password" };
		const user = await User.login(credentials);

		expect(user).toEqual(expect.objectContaining({
			email: credentials.email,
			name,
			isAdmin: true,
			id: expect.any(Number),
		}));
	});
});
