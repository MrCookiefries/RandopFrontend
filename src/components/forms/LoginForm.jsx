import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormikForm from "./FormikForm";
import loginSchema from "../../yupSchemas/users/loginSchema";
import userActions from "../../store/actions/userActions";
import { Container, Typography, Paper, Box } from "@mui/material";

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
						Sign In
					</Typography>
					<Box my={2}>
						<FormikForm
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={loginSchema}
						/>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default LoginForm;
