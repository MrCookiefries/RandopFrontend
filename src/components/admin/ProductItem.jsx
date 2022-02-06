import formatPrice from "../../helpers/formatPrice";
import formatName from "../../helpers/formatName";

const ProductItem = ({ id, name, image, price, option1, option2 }) => {
	return (
		<div>
			<p>{id}</p>
			<p>{formatName(name)}</p>
			<img width={100} height="auto" src={image} alt={name} />
			{option1 && <p>{option1}</p>}
			{option2 && <p>{option2}</p>}
			<p>{formatPrice(price)}</p>
			<button>edit</button>
			<button>delete</button>
		</div>
	);
};

export default ProductItem;
