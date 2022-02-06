import * as Yup from "yup";
import { id, name, image, price, option1, option2 } from "./fields";

const createSchema = Yup.object().shape({
	id, name, image, price, option1, option2
});

export default createSchema;
