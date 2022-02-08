import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea,
	Divider,
	Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import formatPrice from "../../helpers/formatPrice";
import formatName from "../../helpers/formatName";

const ProductCard = ({ id, name, image, price }) => {
	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: "auto" });
	};

	return (
		<Card elevation={4} sx={{ maxWidth: "300px" }}>
			<CardActionArea onClick={handleClick} component={Link} to={id}>
				<CardMedia component="img" height="auto" image={image} alt={name} />
				<Divider sx={{ mt: 1 }}>
					<Chip color="primary" label={formatPrice(price)} />
				</Divider>
				<CardContent>
					<Typography variant="caption">{formatName(name)}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ProductCard;
