import { Outlet } from "react-router";
import Nav from "./Nav";
import Header from "./Header";
import Messages from "./Messages";
import Footer from "./Footer";
import { Container } from "@mui/material";
import background from "../../assets/background.svg";
// SVG from ^ https://www.svgbackgrounds.com/

const Layout = () => {
	return (
		<Container
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
			maxWidth="xl"
			disableGutters
		>
			<Header />
			<Nav />
			<Messages />
			<main
				style={{
					flex: 1,
					backgroundColor: "#DC53E1",
					backgroundImage: `url(${background})`,
					backgroundAttachment: "fixed",
					backgroundSize: "contain",
					backgroundPosition: "center",
				}}
			>
				<Outlet />
			</main>
			<Footer />
		</Container>
	);
};

export default Layout;
