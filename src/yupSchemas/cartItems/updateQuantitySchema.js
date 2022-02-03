import * as Yup from "yup";
import { quantity } from "./fields";

const updateQuantitySchema = Yup.object().shape({
	quantity
});

export default updateQuantitySchema;
