import { Button } from "@mui/material";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Theme from "./theme/Theme";
import { useDispatch } from "react-redux";
import themeActions from "./store/actions/themeActions";
import background from "./assets/background.svg";
// SVG from ^ https://www.svgbackgrounds.com/

const App = () => {
	const dispatch = useDispatch();
	const toggleMode = () => dispatch(themeActions.toggle());

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
