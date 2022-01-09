import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import productActions from "../../store/actions/productActions";
import ProductCard from "./ProductCard";

const ProductList = () => {
	const products = useSelector((store) => store.products, shallowEqual);
	const dispatch = useDispatch();
	const isLoading = !Object.keys(products).length;

	useEffect(() => {
		dispatch(productActions.fetchMany());
	}, [dispatch]);

	return (
		<section>
			<p>products</p>
			{isLoading ? (
				<p>loading...</p>
			) : (
				Object.entries(products).map(([k, v]) => (
					<ProductCard key={k} id={k} {...v} />
				))
			)}
		</section>
	);
};

export default ProductList;
