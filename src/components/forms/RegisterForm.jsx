import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormikForm from "./FormikForm";
import registerSchema from "../../yupSchemas/users/registerSchema";
import userActions from "../../store/actions/userActions";

const RegisterForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = (values) => {
		dispatch(userActions.register(values));
		navigate("..");
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
