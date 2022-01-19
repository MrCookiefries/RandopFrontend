import { Outlet } from "react-router";
import Nav from "./Nav";
import Header from "./Header";
import Messages from "./Messages";

const Layout = () => {
	return (
		<main>
			<Header />
			<Nav />
			<Messages />
			<Outlet />
		</main>
	);
};

export default Layout;
