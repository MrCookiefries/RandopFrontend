import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import cartItemActions from "../../store/actions/cartItemActions";
import CartItemList from "./CartItemList";

const CartDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const cartItems = useSelector((store) => store.cartItems);

	useEffect(() => {
		dispatch(cartItemActions.fetchAll(id));
	}, [dispatch, id]);

	if (!cartItems) return <p>loading...</p>;

	return (
		<div>
			<p>
				cart items for {id} - {Object.keys(cartItems).length}
			</p>
			<CartItemList cartItems={cartItems} />
		</div>
	);
};

export default CartDetails;
