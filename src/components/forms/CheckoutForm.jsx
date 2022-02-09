import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import createMessage from "../../helpers/createMessage";
import { Button } from "@mui/material";

const CheckoutForm = ({ cartId }) => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if (!stripe || !elements) return;

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `http://localhost:3000/payment-success/${cartId}`,
			},
		});

		if (result.error) {
			console.error(result.error.message);
			createMessage({ text: result.error.message, type: "error" });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<Button
				sx={{
					my: 2,
					position: "relative",
					left: "100%",
					transform: "translateX(-100%)",
				}}
				variant="outlined"
				color="secondary"
				disabled={!stripe}
				type="submit"
			>
				Confirm
			</Button>
		</form>
	);
};

export default CheckoutForm;
