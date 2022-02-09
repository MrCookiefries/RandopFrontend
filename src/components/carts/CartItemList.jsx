import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../store/actions/productActions";
import CartItem from "./CartItem";
import formatPrice from "../../helpers/formatPrice";
import { Link as NavLink } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const CartItemList = ({ cartItems }) => {
	const products = useSelector((store) => store.products);
	const dispatch = useDispatch();

	const items = useMemo(() => {
		return Object.entries(cartItems).map(([k, v]) => {
			const [cartId, productId] = k.split("/");
			return { cartId, productId, quantity: v };
		});
	}, [cartItems]);

	const hasProducts = items.every((i) => i.productId in products);

	useEffect(() => {
		if (items.length) {
			// don't fetch products if we have them all already
			if (hasProducts) return;
			const productIds = items.map((i) => i.productId);
			dispatch(productActions.fetchByIds(productIds));
		}
	}, [dispatch, items, hasProducts]);

	if (!items.length)
		return <Typography variant="body1">The cart is empty.</Typography>;

	if (!hasProducts) return <Typography variant="body1">Loading...</Typography>;

	const grandTotal = items.reduce((total, { quantity, productId }) => {
		const { price } = products[productId];
		return total + price * quantity;
	}, 0);

	return (
		<Box>
			<Typography variant="subtitle1" color="secondary">
				Grand Total: {formatPrice(grandTotal)}
			</Typography>
			<Link
				color="info.main"
				to="/checkout"
				state={{ items }}
				component={NavLink}
			>
				<Typography align="right">Checkout This Cart</Typography>
			</Link>
			{items.map((i) => (
				<CartItem key={i.productId} item={i} product={products[i.productId]} />
			))}
		</Box>
	);
};

export default CartItemList;
