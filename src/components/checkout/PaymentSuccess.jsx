import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import createMessage from "../../helpers/createMessage";
import orderActions from "../../store/actions/orderActions";

const PaymentSuccess = () => {
	const { cartId } = useParams();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((store) => store.user).token;

	useEffect(() => {
		// have to be logged in first
		if (!isLoggedIn) return;
		dispatch(orderActions.place(cartId));
		createMessage({ text: "order successfully placed!", type: "good" });
	}, [dispatch, cartId, isLoggedIn]);

	if (!isLoggedIn) return <p>processing...</p>;

	return <Navigate to="/" />;
};

export default PaymentSuccess;
