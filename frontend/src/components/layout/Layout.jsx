import { Outlet } from "react-router";
import Nav from "./Nav";
import Header from "./Header";

const Layout = () => {
	return (
		<main>
			<Header />
			<Nav />
			<Outlet />
		</main>
	);
};

export default Layout;
