import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormikForm from "./FormikForm";
import registerSchema from "../../yupSchemas/users/registerSchema";
import userActions from "../../store/actions/userActions";
import { Container, Typography, Paper, Box } from "@mui/material";

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
		<Container sx={{ my: 4 }} maxWidth="md">
			<Paper
				elevation={10}
				sx={{
					bgcolor: "primary.main",
					color: "primary.contrastText",
				}}
			>
				<Box p={2}>
					<Typography align="center" variant="h2">
						Sign Up
					</Typography>
					<Box my={2}>
						<FormikForm
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={registerSchema}
						/>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default RegisterForm;
