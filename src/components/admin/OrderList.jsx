import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Pagination, PaginationItem } from "@mui/material";
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

	return (
		<div>
			<p>orders</p>
			<div>
				{isLoading || count === null ? (
					<p>loading...</p>
				) : (
					<div>
						<Pagination
							page={page}
							count={Math.ceil(count / 10)}
							renderItem={(item) => (
								<PaginationItem
									component={NavLink}
									to={`./${item.page === 1 ? "" : `?page=${item.page}`}`}
									{...item}
								/>
							)}
						/>
						{Object.entries(orders).map(([k, v]) => (
							<OrderItem key={k} id={k} {...v} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderList;
