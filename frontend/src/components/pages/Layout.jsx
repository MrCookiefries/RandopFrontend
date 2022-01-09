import { Outlet } from "react-router";
import Nav from "../Nav";

const Layout = () => {
	return (
		<main>
			<Nav />
			<Outlet />
		</main>
	);
};

export default Layout;
