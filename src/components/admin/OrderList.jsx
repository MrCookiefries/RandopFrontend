import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
	Pagination,
	PaginationItem,
	Box,
	Paper,
	Typography,
	Container,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import orderActions from "../../store/actions/orderActions";
import { useEffect, useState } from "react";
import Api from "../../helpers/api";
import OrderItem from "./OrderItem";
import { Masonry } from "@mui/lab";

const OrderList = () => {
	const orders = useSelector((store) => store.orders, shallowEqual);
	const dispatch = useDispatch();
	const isLoading = !Object.keys(orders).length;
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get("page") || "1");
	const [count, setCount] = useState(null);

	useEffect(() => {
		dispatch(orderActions.fetchAll(10, (page - 1) * 10));
	}, [dispatch, page]);

	useEffect(() => {
		(async () => {
			const resp = await Api.getOrderCount();
			if (!resp) return;
			setCount(+resp.count);
		})();
	}, []);

	return (
		<>
			<Container maxWidth="xs">
				<Paper elevation={4}>
					<Box p={2}>
						<Typography
							align="center"
							gutterBottom
							variant="h6"
							color="primary"
						>
							Orders
						</Typography>
						{isLoading || count === null ? (
							<Typography variant="body">Loading...</Typography>
						) : (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Paper
									elevation={8}
									sx={{
										maxWidth: "max-content",
									}}
								>
									<Box p={1}>
										<Pagination
											size="small"
											color="secondary"
											page={page}
											count={Math.ceil(count / 10)}
											renderItem={(item) => (
												<PaginationItem
													component={NavLink}
													to={`./${
														item.page === 1 ? "" : `?page=${item.page}`
													}`}
													{...item}
												/>
											)}
										/>
									</Box>
								</Paper>
							</Box>
						)}
					</Box>
				</Paper>
			</Container>
			{!isLoading && count !== null && (
				<Masonry
					columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
					spacing={2}
					sx={{ my: 4 }}
				>
					{Object.entries(orders).map(([k, v]) => (
						<OrderItem key={k} id={k} {...v} />
					))}
				</Masonry>
			)}
		</>
	);
};

export default OrderList;
