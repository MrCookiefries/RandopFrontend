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
			<hr />
		</div>
	);
};

export default ProductCard;
