const jsToSqlConverter = require("./jsToSqlConverter");

describe("converts JS names to SQL ones", () => {
	test("simple names", () => {
		expect(jsToSqlConverter("name")).toBe("name");
		expect(jsToSqlConverter("billy")).toBe("billy");
	});

	test("names with numbers", () => {
		expect(jsToSqlConverter("name23")).toBe("name23");
		expect(jsToSqlConverter("billy14")).toBe("billy14");
	});

	test("camel names", () => {
		expect(jsToSqlConverter("firstName")).toBe("first_name");
		expect(jsToSqlConverter("favoriteColor")).toBe("favorite_color");
	});

	test("pascal names", () => {
		expect(jsToSqlConverter("AwesomeThing")).toBe("awesome_thing");
		expect(jsToSqlConverter("DoctorTim")).toBe("doctor_tim");
	});

	test("complex names", () => {
		expect(
			jsToSqlConverter("super23Duper2StuffHere")
		).toBe("super23_duper2_stuff_here");
		expect(
			jsToSqlConverter("WhoaDid23This0ReallyWork")
		).toBe("whoa_did23_this0_really_work");
	});
});
