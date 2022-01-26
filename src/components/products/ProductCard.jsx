import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import formatPrice from "../../helpers/formatPrice";
import formatName from "../../helpers/formatName";

const ProductCard = ({ id, name, image, price }) => {
	return (
		<Card elevation={4} sx={{ maxWidth: "300px" }}>
			<CardActionArea component={Link} to={id}>
				<CardMedia component="img" height="auto" image={image} alt={name} />
				<CardContent>
					<Typography variant="caption">{formatName(name)}</Typography>
					<Typography variant="body1">{formatPrice(price)}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
