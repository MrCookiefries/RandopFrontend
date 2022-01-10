import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import formatPrice from "../../helpers/formatPrice";
import productActions from "../../store/actions/productActions";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { name, image, option1, option2, price } =
		useSelector((store) => store.products[id]) || {};

	useEffect(() => {
		// don't refetch if product is already in memory
		if (option1 === undefined) dispatch(productActions.fetchOne(id));
	}, [dispatch, id, option1]);

	return (
		<section>
			<p>product details</p>
			<ul>
				<li>id: {id}</li>
				<li>name: {name}</li>
				<li>
					image: <img width={100} height="auto" src={image} alt={name} />
				</li>
				<li>price: {formatPrice(price)}</li>
				<li>option1: {option1}</li>
				<li>option2: {option2}</li>
			</ul>
		</section>
	);
};

export default ProductDetails;
