import { AppBar, Toolbar, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Link component={NavLink} to="products">
					Products
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
