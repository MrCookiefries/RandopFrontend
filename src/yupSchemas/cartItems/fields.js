import * as Yup from "yup";

export const quantity = Yup.number()
	.min(1, "Can't get 0 or less!")
	.max(10, "No more than 10 at a time!")
	.required("Required");

