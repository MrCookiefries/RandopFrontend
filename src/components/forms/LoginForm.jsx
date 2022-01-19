import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormikForm from "./FormikForm";
import loginSchema from "../../yupSchemas/users/loginSchema";
import userActions from "../../store/actions/userActions";

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		email: "",
		password: "",
	};

	const handleSubmit = (values) => {
		dispatch(userActions.login(values));
		navigate("..");
	};

	return (
		<section>
			<p>Login form</p>
			<FormikForm
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={loginSchema}
			/>
		</section>
	);
};

export default LoginForm;
