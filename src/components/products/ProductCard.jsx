import { Link } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import formatPrice from "../../helpers/formatPrice";

const ProductCard = ({ id, name, image, price }) => {
	return (
		<div>
			<ul>
				<li>id: {id}</li>
				<li>name: {name}</li>
				<li>
					image: <img width={100} height="auto" src={image} alt={name} />
				</li>
				<li>price: {formatPrice(price)}</li>
			</ul>
			<Link component={RouteLink} to={id}>
				View details
			</Link>
			<hr />
		</div>
	);
};

export default ProductCard;
