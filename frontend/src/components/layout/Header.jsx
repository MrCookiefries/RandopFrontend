import jumbotron from "../../assets/jumbotron.svg";
// SVG from ^ https://www.svgbackgrounds.com/

const Header = () => {
	return (
		<header
			style={{
				backgroundColor: "#000",
				backgroundImage: `url(${jumbotron})`,
			}}
		>
			<h1>Randop</h1>
			<p>An online shop</p>
		</header>
	);
};

export default Header;
