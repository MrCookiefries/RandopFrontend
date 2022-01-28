import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import addToCartSchema from "../../yupSchemas/cartItems/addToCartSchema";
import {
	Box,
	Grid,
	Button,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	InputLabel,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import formatPrice from "../../helpers/formatPrice";
import cartItemActions from "../../store/actions/cartItemActions";
import createMessage from "../../helpers/createMessage";

const AddToCartForm = ({ price, id }) => {
	const activeCart = useSelector((store) => store.activeCart);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		quantity: 1,
	};

	const handleSubmit = (values) => {
		if (!activeCart) {
			createMessage({
				text: "You must set an active cart to add the items to!",
			});
			return navigate("/carts");
		}
		const cartItem = {
			cartId: +activeCart,
			productId: id,
			quantity: values.quantity,
		};
		dispatch(cartItemActions.create(cartItem));
		navigate("..");
	};

	const formik = useFormik({
		initialValues,
		validationSchema: addToCartSchema,
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

	const subTotal = (quantity) => formatPrice(+price * quantity);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container columns={12}>
				<Grid item xs={12} sm={12} md={7} lg={8}>
					<Box>
						<FormControl sx={{ minWidth: 120 }}>
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
				</Grid>
				<Grid item xs={12} sm={12} md={5} lg={4}>
					<Box>
						<Typography variant="body1">SubTotal</Typography>
						<Typography variant="body1">
							{subTotal(formik.values.quantity)}
						</Typography>
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
							Add To Cart
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
	);
};

export default AddToCartForm;
