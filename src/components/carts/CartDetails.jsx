import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import cartItemActions from "../../store/actions/cartItemActions";
import CartItemList from "./CartItemList";
import { Paper, Box, Typography } from "@mui/material";

const CartDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const cartItems = useSelector((store) => store.cartItems);

	useEffect(() => {
		dispatch(cartItemActions.fetchAll(id));
	}, [dispatch, id]);

	if (!cartItems) return <p>loading...</p>;

	return (
		<Box mb={4}>
			<Paper elevation={18}>
				<Box p={2}>
					<Typography color="primary" variant="h6">
						{Object.keys(cartItems).length} items in cart #{id}
					</Typography>
					<CartItemList cartItems={cartItems} />
				</Box>
			</Paper>
		</Box>
	);
};

export default CartDetails;
