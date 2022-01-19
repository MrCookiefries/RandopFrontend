import { Field } from "formik";
import displayText from "../../helpers/displayText";

const FormField = ({ name, errors, touched }) => {
	let type;
	switch (name) {
		case "email":
			type = "email";
			break;
		case "password":
		case "confirmPassword":
			type = "password";
			break;
		case "price":
			type = "number";
			break;
		default:
			type = "text";
	}
	return (
		<div>
			<label>
				{displayText(name)}
				<Field name={name} type={type} autoComplete="on" />
			</label>
			{touched[name] && errors[name] && <small>{errors[name]}</small>}
		</div>
	);
};

export default FormField;
