import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
	Pagination,
	PaginationItem,
	Box,
	Paper,
	Typography,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import orderActions from "../../store/actions/orderActions";
import { useEffect, useState } from "react";
import Api from "../../helpers/api";
import OrderItem from "./OrderItem";

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

	// order table info
	const makeRowData = (orderId, { checkoutDate, userId, items }) => ({
		orderId,
		checkoutDate,
		userId,
		items,
	});
	const rows = [];
	for (const [orderId, details] of Object.entries(orders)) {
		rows.push(makeRowData(orderId, details));
	}
	const thStyles = { color: "primary.contrastText", bgcolor: "primary.main" };

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
			{!isLoading && count !== null ? (
				<Container maxWidth="lg">
					<TableContainer sx={{ my: 4 }} component={Paper} elevation={10}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell sx={{ ...thStyles }}>Expand</TableCell>
									<TableCell sx={{ ...thStyles }}>Order ID</TableCell>
									<TableCell sx={{ ...thStyles }}>User ID</TableCell>
									<TableCell sx={{ ...thStyles }}>Item Count</TableCell>
									<TableCell sx={{ ...thStyles }}>Checkout Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((r) => (
									<OrderItem key={r.orderId} {...r} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			) : null}
		</>
	);
};

export default OrderList;
