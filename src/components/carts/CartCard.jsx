import { useDispatch } from "react-redux";
import { Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import cartActions from "../../store/actions/cartActions";
import activeCartActions from "../../store/actions/activeCartActions";

const CartCard = ({ id, cart: { userId }, activeId }) => {
	const dispatch = useDispatch();

	const deleteCart = () => {
		dispatch(cartActions.remove(id));
	};

	const setActive = () => {
		dispatch(activeCartActions.set(id));
	};

	return (
		<div>
			<p>
				{id} - {userId}
			</p>
			<button onClick={setActive} disabled={activeId == id}>
				set active
			</button>
			<button onClick={deleteCart}>delete</button>
			<Link component={NavLink} to={id}>
				Details
			</Link>
		</div>
	);
};

export default CartCard;
