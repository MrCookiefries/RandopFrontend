import { AppBar, Toolbar, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const Nav = () => {
	return (
		<nav>
			<AppBar position="sticky">
				<Toolbar>
					<Link component={NavLink} to="/">
						Home
					</Link>
					<Link component={NavLink} to="products">
						Products
					</Link>
					<Link component={NavLink} to="login">
						Login
					</Link>
					<Link component={NavLink} to="register">
						Register
					</Link>
				</Toolbar>
			</AppBar>
		</nav>
	);
};

export default Nav;
