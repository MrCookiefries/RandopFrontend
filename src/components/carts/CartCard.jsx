import { useDispatch } from "react-redux";
import { Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import cartActions from "../../store/actions/cartActions";

const CartCard = ({ id, cart: { userId } }) => {
	const dispatch = useDispatch();

	const deleteCart = () => {
		dispatch(cartActions.remove(id));
	};

	return (
		<div>
			<p>
				{id} - {userId}
			</p>
			<button onClick={deleteCart}>delete</button>
			<Link component={NavLink} to={id}>
				Details
			</Link>
		</div>
	);
};

export default CartCard;
