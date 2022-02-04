import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Api from "../../helpers/api";
import { useLocation } from "react-router";
import CheckoutForm from "../forms/CheckoutForm";

const stripePromise = loadStripe(
	"pk_test_51KIhyCEQEhklMlHg3BOhKX4OxxOzDTYbSfZbRYzCWmBjU87drf0NjmzpaiT4hu63W6eGIFBg7AxE0jXYtStx52mL00m1krDjBT"
);

const Checkout = () => {
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

	if (!clientSecret) return <p>loading...</p>;

	const options = {
		clientSecret,
	};

	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm cartId={cartId} />
		</Elements>
	);
};

export default Checkout;
