import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import orderActions from "../../store/actions/orderActions";

const PaymentSuccess = () => {
	const { cartId } = useParams();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((store) => store.user).token;

	useEffect(() => {
		// have to be logged in first
		if (!isLoggedIn) return;
		dispatch(orderActions.place(cartId));
	}, [dispatch, cartId, isLoggedIn]);

	if (!isLoggedIn) return <p>processing...</p>;

	return <p>{cartId} cart ID!!!!!!!!!!!!!!!!!!!</p>;
};

export default PaymentSuccess;
