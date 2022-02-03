import { useDispatch } from "react-redux";
import formatName from "../../helpers/formatName";
import formatPrice from "../../helpers/formatPrice";
import cartItemActions from "../../store/actions/cartItemActions";
import UpdateQuantityForm from "../forms/UpdateQuantityForm";

const CartItem = ({
	item: { cartId, productId, quantity },
	product: { name, image, option1, option2, price },
}) => {
	const dispatch = useDispatch();

	const removeItem = () => {
		dispatch(cartItemActions.remove(cartId, productId));
	};

	return (
		<div>
			<p>{formatName(name)}</p>
			<img src={image} alt={name} width="100px" height="auto" />
			<p>{option1}</p>
			<p>{option2}</p>
			<p>{formatPrice(price)}</p>
			<UpdateQuantityForm
				quantity={quantity}
				cartId={cartId}
				productId={productId}
			/>
			<p>subtotal {formatPrice(price * quantity)}</p>
			<button onClick={removeItem}>remove</button>
		</div>
	);
};

export default CartItem;
