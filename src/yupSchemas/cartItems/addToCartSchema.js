import * as Yup from "yup";
import { quantity } from "./fields";

const addToCartSchema = Yup.object().shape({
	quantity
});

export default addToCartSchema;
