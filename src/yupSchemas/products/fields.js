import * as Yup from "yup";

export const id = Yup.string()
	.nullable();

export const name = Yup.string()
	.required("Required")
	.max(250, "Too long!")
	.min(1, "Too short!");

export const optName = Yup.string()
	.nullable()
	.max(250, "Too long!")
	.min(1, "Too short!");

export const image = Yup.string()
	.url("Full link to image")
	.required("Required");

export const optImage = Yup.string()
	.url("Full link to image")
	.nullable();

export const price = Yup.number()
	.required("Required")
	.integer("In lowest currency (cents)")
	.positive("Can't be negative")
	.min(1, "Too low!");

export const optPrice = Yup.number()
	.nullable()
	.integer("In lowest currency (cents)")
	.positive("Can't be negative")
	.min(1, "Too low!");

export const option1 = Yup.string()
	.nullable()
	.max(20, "Too long!")
	.min(1, "Too short!");

export const option2 = Yup.string()
	.nullable()
	.max(20, "Too long!")
	.min(1, "Too short!");
