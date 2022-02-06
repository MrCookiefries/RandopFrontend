import { Link as NavLink } from "react-router-dom";
import { Link, Button } from "@mui/material";
import { Outlet } from "react-router";

const AdminPanel = () => {
	return (
		<div>
			<div>
				<p>admins only!</p>
				<Link underline="none" component={NavLink} to="products">
					<Button variant="contained">Manage Products</Button>
				</Link>
				<Link underline="none" component={NavLink} to="orders">
					<Button variant="contained">View Orders</Button>
				</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminPanel;
