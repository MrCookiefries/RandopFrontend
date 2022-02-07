const OrderItem = ({ id, checkoutDate, userId, items }) => {
	return (
		<div>
			<p>order {id}</p>
			<p>{checkoutDate}</p>
			<p>user {userId}</p>
			<p>product count {items.length}</p>
			<ul>
				{items.map((i) => (
					<li key={i.productId}>
						{i.quantity} x product {i.productId}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OrderItem;
