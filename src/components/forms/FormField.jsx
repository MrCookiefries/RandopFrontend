import { FormControl, TextField } from "@mui/material";
import displayText from "../../helpers/displayText";

const FormField = ({ name, formik }) => {
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
		<FormControl sx={{ width: "100%" }}>
			<TextField
				variant="outlined"
				fullWidth
				margin="normal"
				name={name}
				type={type}
				autoComplete="on"
				label={displayText(name)}
				value={formik.values[name]}
				onChange={formik.handleChange}
				error={formik.touched[name] && Boolean(formik.errors[name])}
				helperText={formik.touched[name] && formik.errors[name]}
			/>
		</FormControl>
	);
};

export default FormField;
