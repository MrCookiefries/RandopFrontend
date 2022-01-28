import { Drawer, IconButton, Link, Button, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const MobileDrawer = ({ isLoggedIn, logout }) => {
	// drawer starts closed
	const [openDrawer, setOpenDrawer] = useState(false);
	const toggleDrawer = () => setOpenDrawer((oldDrawer) => !oldDrawer);
	const closeDrawer = () => setOpenDrawer(false);

	const linkProps = {
		component: NavLink,
		onClick: closeDrawer,
	};

	const handleLogout = () => {
		logout();
		closeDrawer();
	};

	return (
		<>
			<Drawer anchor="bottom" open={openDrawer} onClose={closeDrawer}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						alignItems: "center",
						p: 2,
					}}
				>
					<Link {...linkProps} to="products">
						Shop
					</Link>
					{isLoggedIn ? (
						<>
							<Link {...linkProps} to="carts">
								Carts
							</Link>
							<Button onClick={handleLogout} variant="contained">
								Logout
							</Button>
						</>
					) : (
						<>
							<Link underline="none" {...linkProps} to="login">
								<Button variant="contained">Login</Button>
							</Link>
							<Link underline="none" {...linkProps} to="register">
								<Button variant="contained">Register</Button>
							</Link>
						</>
					)}
				</Box>
			</Drawer>
			<IconButton onClick={toggleDrawer}>
				<Menu />
			</IconButton>
		</>
	);
};

export default MobileDrawer;
