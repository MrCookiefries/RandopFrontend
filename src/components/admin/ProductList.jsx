import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Pagination, PaginationItem, Link, Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import productActions from "../../store/actions/productActions";
import { useEffect } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
	const products = useSelector((store) => store.products, shallowEqual);
	const dispatch = useDispatch();
	const isLoading = !Object.keys(products).length;
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1");

	useEffect(() => {
		dispatch(productActions.fetchAll(30, (page - 1) * 10));
	}, [dispatch, page]);

	return (
		<div>
			<div>
				<p>admin products</p>
				<Link underline="none" component={NavLink} to="create">
					<Button variant="contained">Add Product</Button>
				</Link>
			</div>
			<div>
				{isLoading ? (
					<p>loading...</p>
				) : (
					<div>
						<Pagination
							page={page}
							count={10}
							renderItem={(item) => (
								<PaginationItem
									component={NavLink}
									to={`./${item.page === 1 ? "" : `?page=${item.page}`}`}
									{...item}
								/>
							)}
						/>
						{Object.entries(products).map(([k, v]) => (
							<ProductItem key={k} id={k} {...v} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductList;
