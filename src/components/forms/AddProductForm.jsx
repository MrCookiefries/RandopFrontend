import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormikForm from "./FormikForm";
import createSchema from "../../yupSchemas/products/createSchema";
import { Container, Typography, Paper, Box } from "@mui/material";
import removeFalseyValues from "../../helpers/removeFalseyValues";
import productActions from "../../store/actions/productActions";

const AddProductForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		id: "",
		name: "",
		image: "",
		price: "",
		option1: "",
		option2: "",
	};

	const handleSubmit = (values) => {
		const newProduct = removeFalseyValues(values);
		dispatch(productActions.create(newProduct));
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
						Create Product
					</Typography>
					<Box my={2}>
						<FormikForm
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={createSchema}
						/>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default AddProductForm;
