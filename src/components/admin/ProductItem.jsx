import formatPrice from "../../helpers/formatPrice";
import formatName from "../../helpers/formatName";
import { Link as NavLink } from "react-router-dom";
import { Link, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import productActions from "../../store/actions/productActions";

const ProductItem = ({ id, name, image, price, option1, option2 }) => {
	const dispatch = useDispatch();

	const deleteProduct = () => {
		dispatch(productActions.remove(id));
	};

	return (
		<div>
			<p>{id}</p>
			<p>{formatName(name)}</p>
			<img width={100} height="auto" src={image} alt={name} />
			{option1 && <p>{option1}</p>}
			{option2 && <p>{option2}</p>}
			<p>{formatPrice(price)}</p>
			<Link
				component={NavLink}
				underline="none"
				to="update"
				state={{ product: { id, name, image, price, option1, option2 } }}
			>
				<Button variant="outlined">Edit</Button>
			</Link>
			<Button onClick={deleteProduct} variant="outlined">
				Delete
			</Button>
		</div>
	);
};

export default ProductItem;
