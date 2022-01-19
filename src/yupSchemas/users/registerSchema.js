import * as Yup from "yup";
import { name, email, password, confirmPassword } from "./fields";

const registerSchema = Yup.object().shape({
	name, email, password, confirmPassword
});

export default registerSchema;
