import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import cartActions from "../../store/actions/cartActions";
import CartCard from "./CartCard";

const CartList = () => {
	const carts = useSelector((store) => store.carts);
	const { length: hasCart } = Object.keys(carts);
	const dispatch = useDispatch();

	const createCart = () => {
		dispatch(cartActions.create());
	};

	useEffect(() => {
		dispatch(cartActions.fetchAll());
	}, [dispatch]);

	return (
		<div>
			<button onClick={createCart}>create</button>
			{hasCart ? (
				<div>
					{Object.entries(carts).map(([k, v]) => (
						<CartCard key={k} id={k} cart={v} />
					))}
				</div>
			) : null}
			<Outlet />
		</div>
	);
};

export default CartList;
