import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Outlet } from "react-router";
import productActions from "../../store/actions/productActions";
import ProductCard from "./ProductCard";
import { Link, useLocation } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

const ProductList = () => {
	const products = useSelector((store) => store.products, shallowEqual);
	const dispatch = useDispatch();
	const isLoading = !Object.keys(products).length;
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1");

	useEffect(() => {
		dispatch(productActions.fetchAll(10, (page - 1) * 10));
	}, [dispatch, page]);

	return (
		<section>
			<Outlet />
			<p>products</p>
			{isLoading ? (
				<p>loading...</p>
			) : (
				<div>
					{Object.entries(products).map(([k, v]) => (
						<ProductCard key={k} id={k} {...v} />
					))}
					<Pagination
						page={page}
						count={30}
						renderItem={(item) => (
							<PaginationItem
								component={Link}
								to={`./${item.page === 1 ? "" : `?page=${item.page}`}`}
								{...item}
							/>
						)}
					/>
				</div>
			)}
		</section>
	);
};

export default ProductList;
