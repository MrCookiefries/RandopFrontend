import { Link as NavLink } from "react-router-dom";
import { Link, Button, Container, Paper, Box, Typography } from "@mui/material";
import { Outlet } from "react-router";

const AdminPanel = () => {
	return (
		<Box p={2}>
			<Container maxWidth="xs">
				<Paper elevation={10}>
					<Box p={2}>
						<Typography variant="h5" gutterBottom>
							Available Options
						</Typography>
						<Box my={2}>
							<Link underline="none" component={NavLink} to="products">
								<Button variant="contained">Manage Products</Button>
							</Link>
						</Box>
						<Box>
							<Link underline="none" component={NavLink} to="orders">
								<Button variant="contained">View Orders</Button>
							</Link>
						</Box>
					</Box>
				</Paper>
			</Container>
			<Box mt={4}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default AdminPanel;
