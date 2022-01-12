import { Button } from "@mui/material";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Theme from "./theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import themeActions from "./store/actions/themeActions";
import background from "./assets/background.svg";
// SVG from ^ https://www.svgbackgrounds.com/
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import Api from "./helpers/api";

const App = () => {
	const dispatch = useDispatch();
	const toggleMode = () => dispatch(themeActions.toggle());

	// manage token when user changes
	const user = useSelector((store) => store.user);
	const [token, setToken] = useLocalStorage("token");
	Api.token = token;

	useEffect(() => {
		if (user.token) setToken(user.token);
	}, [user, setToken]);

	return (
		<div
			className="App"
			style={{
				backgroundColor: "#64F8FF",
				backgroundImage: `url(${background})`,
				backgroundAttachment: "fixed",
				backgroundSize: "contain",
			}}
		>
			<Theme>
				<Button onClick={toggleMode} variant="outlined" color="secondary">
					hi
				</Button>
				<AppRoutes />
			</Theme>
		</div>
	);
};

export default App;
// https://www.svgbackgrounds.com/
