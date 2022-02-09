import {
	Box,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";

const OrderItem = ({ id, checkoutDate, userId, items }) => {
	return (
		<Paper elevation={16}>
			<Box p={2}>
				<Box
					mb={1}
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: 2,
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Typography variant="subtitle1" color="primary">
							Order #{id}
						</Typography>
					</Box>
					<Box>
						<Typography variant="caption" color="secondary">
							@ {new Date(checkoutDate).toLocaleString()}
						</Typography>
					</Box>
				</Box>
				<Typography gutterBottom variant="body1">
					User #{userId} with {items.length} product
					{items.length === 1 ? "" : "s"}
				</Typography>
				<Typography gutterBottom variant="body1"></Typography>
				<List>
					{items.map((i) => (
						<ListItem key={i.productId}>
							<ListItemText>
								{i.quantity} &times; {i.productId}
							</ListItemText>
						</ListItem>
					))}
				</List>
			</Box>
		</Paper>
	);
};

export default OrderItem;
