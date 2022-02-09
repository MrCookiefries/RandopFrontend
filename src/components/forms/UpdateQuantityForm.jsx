import { useDispatch } from "react-redux";
import updateQuantitySchema from "../../yupSchemas/cartItems/updateQuantitySchema";
import {
	Box,
	Button,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import cartItemActions from "../../store/actions/cartItemActions";
import createMessage from "../../helpers/createMessage";

const UpdateQuantityForm = ({ cartId, productId, quantity, isTablet }) => {
	const dispatch = useDispatch();

	const initialValues = {
		quantity,
	};

	const handleSubmit = (values) => {
		const cartItem = {
			cartId: +cartId,
			productId,
			quantity: values.quantity,
		};
		dispatch(cartItemActions.update(cartItem));
		createMessage({
			text: `Updated quantity to ${values.quantity}`,
			type: "good",
		});
	};

	const formik = useFormik({
		initialValues,
		validationSchema: updateQuantitySchema,
		onSubmit: handleSubmit,
	});

	const menuItems = [];
	for (let i = 1; i <= 10; i++) {
		menuItems.push(
			<MenuItem key={i} value={i}>
				{i}
			</MenuItem>
		);
	}

	return (
		<Box my={isTablet ? 1 : 0}>
			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						display: "flex",
						flexDirection: isTablet ? "row" : "column",
						flexWrap: "wrap",
					}}
				>
					<Box>
						<FormControl size="small" sx={{ minWidth: 120 }}>
							<InputLabel id="quantity-label">Quantity</InputLabel>
							<Select
								label="Quantity"
								labelId="quantity-label"
								value={formik.values.quantity}
								onChange={formik.handleChange}
								name="quantity"
							>
								{menuItems}
							</Select>
							<FormHelperText
								error={
									formik.touched.quantity && Boolean(formik.errors.quantity)
								}
							>
								{formik.touched.quantity && formik.errors.quantity}
							</FormHelperText>
						</FormControl>
					</Box>
					<Box>
						<Button
							sx={{ minWidth: 120 }}
							variant="outlined"
							type="submit"
							disabled={quantity === formik.values.quantity}
						>
							{quantity !== formik.values.quantity ? "Save" : "Unchanged"}
						</Button>
					</Box>
				</Box>
			</form>
		</Box>
	);
};

export default UpdateQuantityForm;
