import { Container, Typography, Paper, Box, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as NavLink } from "react-router-dom";
import jumbotron from "../../assets/jumbotron.svg";
// SVG from ^ https://www.svgbackgrounds.com/

const Header = () => {
	const { isAdmin } = useSelector((store) => store.user);

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
						<Typography color="primary" align="center" variant="h1">
							Randop
						</Typography>
						<Typography pb={1} align="center" variant="subtitle1">
							An online shop of random goods
						</Typography>
						{isAdmin ? (
							<Link
								align="center"
								color="info.main"
								component={NavLink}
								to="admin"
							>
								<Typography pb={1} align="center" variant="body1">
									Visit Admin Panel
								</Typography>
							</Link>
						) : null}
					</Paper>
				</Box>
			</Container>
		</header>
	);
};

export default Header;
