import {
	TableRow,
	TableCell,
	Collapse,
	IconButton,
	Typography,
	Table,
	TableHead,
	TableBody,
	Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";

const OrderItem = ({ orderId, checkoutDate, userId, items }) => {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(!open);

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton onClick={close}>
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>
				<TableCell>{orderId}</TableCell>
				<TableCell>{userId}</TableCell>
				<TableCell>{items.length}</TableCell>
				<TableCell>{new Date(checkoutDate).toLocaleString()}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ py: 0 }} colSpan={5}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box m={1}>
							<Typography gutterBottom variant="subtitle1" color="primary">
								Items
							</Typography>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Quantity</TableCell>
										<TableCell>Product ID</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{items.map((i) => (
										<TableRow key={i.productId}>
											<TableCell>{i.quantity}</TableCell>
											<TableCell>{i.productId}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default OrderItem;
