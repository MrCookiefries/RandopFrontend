import { Container, Paper, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import FormField from "./FormField";

const FormikForm = ({
	initialValues,
	validationSchema,
	onSubmit,
	submitLabel = "Submit",
}) => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<Container maxWidth="sm">
			<Paper elevation={20}>
				<Box p={2}>
					<form onSubmit={formik.handleSubmit}>
						{Object.keys(initialValues).map((k) => (
							<FormField key={k} name={k} formik={formik} />
						))}
						<Button
							sx={{
								position: "relative",
								left: "100%",
								transform: "translateX(-100%)",
								mt: 2,
							}}
							variant="outlined"
							type="submit"
						>
							{submitLabel}
						</Button>
					</form>
				</Box>
			</Paper>
		</Container>
	);
};

export default FormikForm;
