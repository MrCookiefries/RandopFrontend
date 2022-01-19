const ExpressError = require("../ExpressError");
const sqlPartialUpdate = require("./sqlPartialUpdate");

describe("creates sql string for update & array values", () => {
	const dataObj = {
		firstName: "Bob",
		age: 26
	};

	test("returned sql string", () => {
		const { setColumns } = sqlPartialUpdate(dataObj);
		expect(setColumns).toBe(`"first_name"=$1, "age"=$2`);
	});

	test("returned values array", () => {
		const { values } = sqlPartialUpdate(dataObj);
		expect(values).toEqual(Object.values(dataObj));
	});

	test("empty input object", () => {
		expect(
			() => sqlPartialUpdate({})
		).toThrowError(ExpressError);
	});
});
