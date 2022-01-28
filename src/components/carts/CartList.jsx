import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import cartActions from "../../store/actions/cartActions";
import CartCard from "./CartCard";

const CartList = () => {
	const carts = useSelector((store) => store.carts);
	const { length: hasCart } = Object.keys(carts);
	const dispatch = useDispatch();

	const activeCart = useSelector((store) => store.activeCart);

	const createCart = () => {
		dispatch(cartActions.create());
	};

	useEffect(() => {
		dispatch(cartActions.fetchAll());
	}, [dispatch]);

	return (
		<div>
			<button onClick={createCart}>create</button>
			{activeCart ? (
				<p>active cart id: {activeCart}</p>
			) : (
				<p>no active cart set</p>
			)}
			{hasCart ? (
				<div>
					{Object.entries(carts).map(([k, v]) => (
						<CartCard key={k} id={k} cart={v} activeId={activeCart} />
					))}
				</div>
			) : (
				<p>none or loading</p>
			)}
			<Outlet />
		</div>
	);
};

export default CartList;
