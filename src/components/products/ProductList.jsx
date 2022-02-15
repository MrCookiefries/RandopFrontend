import { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Outlet } from "react-router";
import productActions from "../../store/actions/productActions";
import ProductCard from "./ProductCard";
import { Link, useLocation } from "react-router-dom";
import {
	Pagination,
	PaginationItem,
	Paper,
	Typography,
	Box,
} from "@mui/material";
import Api from "../../helpers/api";

const ProductList = () => {
	const products = useSelector((store) => store.products, shallowEqual);
	const dispatch = useDispatch();
	const isLoading = !Object.keys(products).length;
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1");
	const [count, setCount] = useState(null);

	useEffect(() => {
		(async () => {
			const resp = await Api.getProductCount();
			if (!resp) return;
			setCount(+resp.count);
		})();
	}, []);

	useEffect(() => {
		dispatch(productActions.fetchAll(10, (page - 1) * 10));
	}, [dispatch, page]);

	return (
		<Box p={2}>
			<Outlet />
			<Typography variant="h2" gutterBottom>
				Our Products
			</Typography>
			{isLoading || count === null ? (
				<Typography variant="body1">Loading...</Typography>
			) : (
				<>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							gap: 4,
						}}
					>
						{Object.entries(products).map(([k, v]) => (
							<ProductCard key={k} id={k} {...v} />
						))}
					</Box>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Paper elveation={8} sx={{ mt: 4, width: "max-content" }}>
							<Box px={1} py={2}>
								<Pagination
									size="small"
									color="secondary"
									page={page}
									count={Math.ceil(count / 10)}
									renderItem={(item) => (
										<PaginationItem
											component={Link}
											to={`./${item.page === 1 ? "" : `?page=${item.page}`}`}
											{...item}
										/>
									)}
								/>
							</Box>
						</Paper>
					</Box>
				</>
			)}
		</Box>
	);
};

export default ProductList;
