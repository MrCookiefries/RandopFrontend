import * as Yup from "yup";

export const name = Yup.string()
	.min(1, "Too short!")
	.max(20, "Too long!")
	.required("Required");

export const email = Yup.string()
	.min(3, "Too short")
	.max(40, "Too long")
	.email("Invallid email")
	.required("Required");

export const password = Yup.string()
	.min(6, "Too short")
	.required("Required");

// https://stackoverflow.com/questions/61862252/yup-schema-validation-password-and-confirmpassword-doesnt-work
// taken from ^ on January 9th, 2022
export const confirmPassword = Yup.string()
	.required("Required")
	.oneOf([Yup.ref("password"), null], "Passwords don't match");
