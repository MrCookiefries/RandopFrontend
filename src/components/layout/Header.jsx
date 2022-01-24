import { Container, Typography, Paper, Box } from "@mui/material";
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
			<Container maxWidth="xs">
				<Box py={4}>
					<Paper elevation={24}>
						<Typography align="center" variant="h1">
							Randop
						</Typography>
						<Typography pb={1} align="center" variant="subtitle1">
							An online shop of random goods
						</Typography>
					</Paper>
				</Box>
			</Container>
		</header>
	);
};

export default Header;
