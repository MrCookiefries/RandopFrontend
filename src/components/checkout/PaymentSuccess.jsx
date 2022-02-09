import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import createMessage from "../../helpers/createMessage";
import orderActions from "../../store/actions/orderActions";
import { Paper, Typography, Box } from "@mui/material";

const PaymentSuccess = () => {
	const { cartId } = useParams();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((store) => store.user).token;

	useEffect(() => {
		// have to be logged in first
		if (!isLoggedIn) return;
		dispatch(orderActions.place(cartId));
		createMessage({ text: "Order successfully placed!", type: "success" });
	}, [dispatch, cartId, isLoggedIn]);

	if (!isLoggedIn)
		return (
			<Box p={2}>
				<Paper elevation={10}>
					<Box p={2}>
						<Typography variant="body1">Processing...</Typography>
					</Box>
				</Paper>
			</Box>
		);

	return <Navigate to="/" />;
};

export default PaymentSuccess;
