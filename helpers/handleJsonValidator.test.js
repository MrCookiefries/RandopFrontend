const jsonschema = require("jsonschema");

const ExpressError = require("../ExpressError");
const newUserSchema = require("../jsonschemas/users/new.json");
const handleJsonValidator = require("./handleJsonValidator");

describe("verifies instance matches json schema", () => {
	let instance;

	beforeEach(() => {
		instance = {
			"email": "test@gmail.com",
			"name": "my name",
			"password": "password123!"
		};
	});

	test("good instance", () => {
		expect(
			handleJsonValidator(instance, newUserSchema)
		).toBeUndefined();
	});

	test("extra property", () => {
		instance.age = 26;
		expect(
			handleJsonValidator(instance, newUserSchema)
		).toBeUndefined()
	});

	test("wrong data type", () => {
		instance.password = false;
		expect(
			() => handleJsonValidator(instance, newUserSchema)
		).toThrowError(ExpressError);
	});

	test("missing property", () => {
		delete instance.name;
		expect(
			() => handleJsonValidator(instance, newUserSchema)
		).toThrowError(ExpressError);
	});

	test("invalid property", () => {
		instance.email = "not an email";
		expect(
			() => handleJsonValidator(instance, newUserSchema)
		).toThrowError(ExpressError);
	});
});
