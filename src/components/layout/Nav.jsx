import {
	AppBar,
	Toolbar,
	Link,
	Button,
	Box,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../store/actions/userActions";
import ToggleThemeButton from "./ToggleThemeButton";
import MobileDrawer from "./MobileDrawer";

const Nav = () => {
	const isLoggedIn = useSelector((store) => store.user.token);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(userActions.logout());
	};

	const boxSx = {
		display: "flex",
		alignItems: "center",
		flex: 1,
		gap: 4,
	};

	// determine if mobile breakpoint is hit or not
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<AppBar component="nav" position="sticky" color="grey" enableColorOnDark>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Box
					sx={{
						...boxSx,
						justifyContent: "start",
					}}
				>
					<ToggleThemeButton />
					<Link component={NavLink} to="/">
						Home
					</Link>
				</Box>
				{isMobile ? null : (
					<Box
						sx={{
							...boxSx,
							justifyContent: "center",
						}}
					>
						<Link component={NavLink} to="products">
							Shop
						</Link>
						{isLoggedIn ? (
							<Link component={NavLink} to="cart">
								Cart
							</Link>
						) : null}
					</Box>
				)}
				<Box
					sx={{
						...boxSx,
						justifyContent: "end",
					}}
				>
					{isMobile ? (
						<MobileDrawer isLoggedIn={isLoggedIn} logout={logout} />
					) : isLoggedIn ? (
						<Button onClick={logout} variant="contained">
							Logout
						</Button>
					) : (
						<>
							<Link underline="none" component={NavLink} to="login">
								<Button variant="contained">Login</Button>
							</Link>
							<Link underline="none" component={NavLink} to="register">
								<Button variant="contained">Register</Button>
							</Link>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Nav;
