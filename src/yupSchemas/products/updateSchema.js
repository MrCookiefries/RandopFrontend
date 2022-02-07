import * as Yup from "yup";
import { optName as name, optImage as image, optPrice as price, option1, option2 } from "./fields";

const updateSchema = Yup.object().shape({
	name, image, price, option1, option2
});

export default updateSchema;
