import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
	Pagination,
	PaginationItem,
	Link,
	Button,
	Typography,
	Paper,
	Container,
	Box,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import productActions from "../../store/actions/productActions";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
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
		dispatch(productActions.fetchAll(30, (page - 1) * 30));
	}, [dispatch, page]);

	return (
		<>
			<Container maxWidth="xs">
				<Paper elevation={4}>
					<Box p={2}>
						<Typography gutterBottom color="primary" variant="h5">
							Admin Products
						</Typography>
						<Box my={2}>
							<Link underline="none" component={NavLink} to="create">
								<Button variant="outlined">Add Product</Button>
							</Link>
						</Box>
						{isLoading || count === null ? null : (
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Pagination
									color="secondary"
									size="small"
									page={page}
									count={Math.ceil(count / 30)}
									renderItem={(item) => (
										<PaginationItem
											component={NavLink}
											to={`./${item.page === 1 ? "" : `?page=${item.page}`}`}
											{...item}
										/>
									)}
								/>
							</Box>
						)}
					</Box>
				</Paper>
			</Container>
			{isLoading ? (
				<Paper elevation="6">
					<Box p={2}>
						<Typography variant="body">Loading...</Typography>
					</Box>
				</Paper>
			) : (
				<Container maxWidth="md">
					{Object.entries(products).map(([k, v]) => (
						<Box my={2} key={k}>
							<ProductItem id={k} {...v} />
						</Box>
					))}
				</Container>
			)}
		</>
	);
};

export default ProductList;
