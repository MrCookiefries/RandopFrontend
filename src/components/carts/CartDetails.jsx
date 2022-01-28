import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import cartItemActions from "../../store/actions/cartItemActions";

const CartDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const cartItems = useSelector((store) => store.cartItems);

	useEffect(() => {
		dispatch(cartItemActions.fetchAll(id));
	}, [dispatch, id]);

	return (
		<p>
			cart items for {id} - {Object.keys(cartItems).length}
		</p>
	);
};

export default CartDetails;
