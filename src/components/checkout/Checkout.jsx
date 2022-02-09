import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Api from "../../helpers/api";
import { useLocation } from "react-router";
import CheckoutForm from "../forms/CheckoutForm";
import {
	Box,
	Paper,
	Typography,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
	"pk_test_51KIhyCEQEhklMlHg3BOhKX4OxxOzDTYbSfZbRYzCWmBjU87drf0NjmzpaiT4hu63W6eGIFBg7AxE0jXYtStx52mL00m1krDjBT"
);

const Checkout = () => {
	const { isDark } = useSelector((store) => store.theme);
	const theme = useTheme();
	const [clientSecret, setClientSecret] = useState(null);
	const location = useLocation();
	const { cartId } = location.state?.items[0];

	useEffect(() => {
		(async () => {
			if ("items" in location.state) {
				const items = location.state.items.map((i) => ({
					productId: i.productId,
					quantity: i.quantity,
				}));
				const resp = await Api.createPayment(items);
				if (!resp) return;
				const { clientSecret } = resp;
				setClientSecret(clientSecret);
			}
		})();
	}, [location.state]);

	if (!clientSecret)
		return (
			<Box m={2}>
				<Paper elevation={6}>
					<Box p={2}>
						<Typography variant="body1">Loading...</Typography>
					</Box>
				</Paper>
			</Box>
		);

	const options = {
		clientSecret,
		appearance: {
			theme: isDark ? "night" : "stripe",
			labels: "floating",
			variables: {
				colorPrimary: theme.palette.primary.main,
				colorBackground: theme.palette.background.paper,
				colorText: theme.palette.text.primary,
				colorDanger: theme.palette.error.main,
				fontFamily: theme.typography.fontFamily,
			},
		},
	};

	// card table info
	const makeRowData = (number, details) => ({ number, details });
	const rows = [
		makeRowData("4242 4242 4242 4242", "Working Visa Card"),
		makeRowData("5555 5555 5555 4444", "Working Mastercard"),
		makeRowData("4000 0000 0000 0002", "Declined card error"),
		makeRowData("4000 0000 0000 9995", "Insufficient funds error"),
		makeRowData("4000 0000 0000 0101", "CVC check fails error"),
		makeRowData("4100 0000 0000 0019", "Charge blocked, high risk"),
	];

	return (
		<Container disableGutters maxWidth="md">
			<Box my={4} mx={2}>
				<Paper elevation={6}>
					<Box p={2}>
						<Typography gutterBottom color="primary" variant="h5">
							Enter Stripe Test Card Data
						</Typography>
						<Elements stripe={stripePromise} options={options}>
							<CheckoutForm cartId={cartId} />
						</Elements>
						<Typography gutterBottom variant="body1">
							For the expiration date, use any future date. For the CVC code,
							use any numbers.
						</Typography>
						<TableContainer component={Paper} elevation={12}>
							<Table size="small">
								<TableHead
									sx={{
										bgcolor: "primary.main",
									}}
								>
									<TableRow>
										<TableCell sx={{ color: "primary.contrastText" }}>
											Number
										</TableCell>
										<TableCell
											sx={{ color: "primary.contrastText" }}
											align="right"
										>
											Details
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((r) => (
										<TableRow key={r.number}>
											<TableCell>{r.number}</TableCell>
											<TableCell align="right">{r.details}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default Checkout;
