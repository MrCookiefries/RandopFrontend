import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../store/actions/productActions";
import CartItem from "./CartItem";
import formatPrice from "../../helpers/formatPrice";
import { Link as NavLink } from "react-router-dom";

const CartItemList = ({ cartItems }) => {
	const products = useSelector((store) => store.products);
	const dispatch = useDispatch();

	const items = useMemo(() => {
		return Object.entries(cartItems).map(([k, v]) => {
			const [cartId, productId] = k.split("/");
			return { cartId, productId, quantity: v };
		});
	}, [cartItems]);

	const hasProducts = items.every((i) => i.productId in products);

	useEffect(() => {
		if (items.length) {
			// don't fetch products if we have them all already
			if (hasProducts) return;
			const productIds = items.map((i) => i.productId);
			dispatch(productActions.fetchByIds(productIds));
		}
	}, [dispatch, items, hasProducts]);

	if (!items.length) return <p>empty cart.</p>;

	if (!hasProducts) return <p>loading...</p>;

	const grandTotal = items.reduce((total, { quantity, productId }) => {
		const { price } = products[productId];
		return total + price * quantity;
	}, 0);

	return (
		<div>
			<div>
				<p>Grand Total {formatPrice(grandTotal)}</p>
				<NavLink to="/checkout" state={{ items }}>
					Checkout
				</NavLink>
			</div>
			{items.length ? (
				items.map((i) => (
					<CartItem
						key={i.productId}
						item={i}
						product={products[i.productId]}
					/>
				))
			) : (
				<p>no items</p>
			)}
		</div>
	);
};

export default CartItemList;
