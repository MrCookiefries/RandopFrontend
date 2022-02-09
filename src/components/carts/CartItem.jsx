import { useDispatch } from "react-redux";
import formatName from "../../helpers/formatName";
import formatPrice from "../../helpers/formatPrice";
import cartItemActions from "../../store/actions/cartItemActions";
import UpdateQuantityForm from "../forms/UpdateQuantityForm";
import {
	Typography,
	Paper,
	Button,
	Box,
	useTheme,
	useMediaQuery,
} from "@mui/material";

const CartItem = ({
	item: { cartId, productId, quantity },
	product: { name, image, option1, option2, price },
}) => {
	const dispatch = useDispatch();

	const removeItem = () => {
		dispatch(cartItemActions.remove(cartId, productId));
	};

	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box my={2}>
			<Paper elevation={24}>
				<Box
					p={1}
					sx={
						isTablet
							? {}
							: {
									display: "flex",
									gap: 2,
									alignItems: "center",
									flex: 2,
							  }
					}
				>
					<Box sx={{ flex: 1 }}>
						<Typography gutterBottom={isTablet} variant="body1">
							{formatName(name)}
						</Typography>
					</Box>
					<Box>
						<img src={image} alt={name} width="100px" height="auto" />
					</Box>
					<Box
						sx={
							isTablet
								? {
										display: "flex",
										flexWrap: "wrap",
										gap: 2,
								  }
								: {}
						}
					>
						<Typography color="primary" variant="body1">
							{formatPrice(price)}
						</Typography>
						{option1 && <Typography variant="body1">{option1}</Typography>}
						{option2 && <Typography variant="body1">{option2}</Typography>}
					</Box>
					<Box>
						<UpdateQuantityForm
							quantity={quantity}
							cartId={cartId}
							productId={productId}
							isTablet={isTablet}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: isTablet ? "row" : "column",
							flexWrap: "wrap",
							gap: isTablet ? 2 : 0,
						}}
					>
						<Typography color="primary" variant="body1">
							Subtotal
						</Typography>
						<Typography variant="body1">
							{formatPrice(price * quantity)}
						</Typography>
					</Box>
					<Box mt={isTablet ? 1 : 0}>
						<Button color="secondary" variant="contained" onClick={removeItem}>
							Remove
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default CartItem;
