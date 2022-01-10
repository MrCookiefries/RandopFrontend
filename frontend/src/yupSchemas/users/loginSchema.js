import * as Yup from "yup";
import { email, password } from "./fields";

const loginSchema = Yup.object().shape({
	email, password
});

export default loginSchema;
