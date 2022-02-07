import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import FormikForm from "./FormikForm";
import updateSchema from "../../yupSchemas/products/updateSchema";
import { Container, Typography, Paper, Box } from "@mui/material";
import removeFalseyValues from "../../helpers/removeFalseyValues";
import productActions from "../../store/actions/productActions";

const UpdateProductForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { id, name, image, price, option1, option2 } = location.state?.product;

	if (!id) return <Navigate to=".." />;

	const initialValues = {
		name,
		image,
		price,
		option1,
		option2,
	};

	const handleSubmit = (values) => {
		const newVals = removeFalseyValues(values);
		dispatch(productActions.update(id, newVals));
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
						Edit Product
					</Typography>
					<Box my={2}>
						<FormikForm
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={updateSchema}
						/>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default UpdateProductForm;
