// formats a price from 1499 -> $14.99
const formatPrice = price => {
	const [whole, decimal] = `${price / 100}`.split(".");
	const wholeArr = [...whole];
	for (let i = wholeArr.length - 3; i > 0; i -= 3) {
		wholeArr.splice(i, 0, ",");
	}
	return `$${wholeArr.join("")}.${decimal}`;
}

export default formatPrice;
