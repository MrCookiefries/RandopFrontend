import {
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Button,
	Link,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import formatPrice from "../../helpers/formatPrice";

const ProductInfo = ({ price, option1, option2, isSmall }) => {
	const alignment = isSmall ? "left" : "right";

	return (
		<Box
			p={2}
			sx={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<Typography align={alignment} variant="body1">
				Details
			</Typography>
			<List sx={{ my: 2 }}>
				{option1 && (
					<ListItem>
						<ListItemText align={alignment}>{option1}</ListItemText>
					</ListItem>
				)}
				{option2 && (
					<ListItem>
						<ListItemText align={alignment}>{option2}</ListItemText>
					</ListItem>
				)}
				<ListItem>
					<ListItemText align={alignment}>{formatPrice(price)}</ListItemText>
				</ListItem>
			</List>
			<Typography mb={2} align={alignment} variant="body1">
				Hundreds of great products like this one are waiting for you, go and
				check out our random selection of items now.
			</Typography>
			<Box sx={{ flex: 1, alignSelf: "flex-end", display: "flex" }}>
				<Link
					sx={{
						alignSelf: "flex-end",
					}}
					underline="none"
					component={NavLink}
					to="products"
				>
					<Button variant="outlined">Shop Now</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default ProductInfo;
