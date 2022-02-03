import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		if (!stripe || !elements) return;

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/",
			},
		});

		if (result.error) {
			console.error(result.error.message);
			// create message
		} else {
			// make order & delete cart
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button disabled={!stripe} type="submit">
				Confirm
			</button>
		</form>
	);
};

export default CheckoutForm;
