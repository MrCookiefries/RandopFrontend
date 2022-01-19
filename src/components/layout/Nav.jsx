import { AppBar, Toolbar, Link, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../store/actions/userActions";

const Nav = () => {
	const isLoggedIn = useSelector((store) => store.user.token);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(userActions.logout());
	};

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
					{isLoggedIn ? (
						<>
							<Button onClick={logout} variant="contained">
								Logout
							</Button>
						</>
					) : (
						<>
							<Link component={NavLink} to="login">
								Login
							</Link>
							<Link component={NavLink} to="register">
								Register
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</nav>
	);
};

export default Nav;
