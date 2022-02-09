import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import cartActions from "../../store/actions/cartActions";
import CartCard from "./CartCard";
import { Button, Typography, Box, Container, Paper } from "@mui/material";

const CartList = () => {
	const carts = useSelector((store) => store.carts);
	const { length: hasCart } = Object.keys(carts);
	const dispatch = useDispatch();

	const activeCart = useSelector((store) => store.activeCart);

	const createCart = () => {
		dispatch(cartActions.create());
	};

	useEffect(() => {
		dispatch(cartActions.fetchAll());
	}, [dispatch]);

	return (
		<Box p={2}>
			<Container maxWidth="xs" sx={{ mb: 4 }}>
				<Paper elevation={4}>
					<Box p={2}>
						<Typography gutterBottom variant="h5">
							{activeCart ? `Active Cart: ${activeCart}` : "No cart set active"}
						</Typography>
						<Button variant="outlined" onClick={createCart}>
							Create Cart
						</Button>
					</Box>
				</Paper>
			</Container>
			{hasCart ? (
				<>
					<Outlet />
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							gap: 2,
						}}
					>
						{Object.entries(carts).map(([k, v]) => (
							<CartCard key={k} id={k} cart={v} activeId={activeCart} />
						))}
					</Box>
				</>
			) : (
				<Typography variant="body1">0 carts loaded right now.</Typography>
			)}
		</Box>
	);
};

export default CartList;
