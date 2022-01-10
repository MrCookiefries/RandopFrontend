import FormikForm from "./FormikForm";
import registerSchema from "../../yupSchemas/users/registerSchema";

const RegisterForm = () => {
	const initialValues = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<section>
			<p>Register form</p>
			<FormikForm
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={registerSchema}
			/>
		</section>
	);
};

export default RegisterForm;
