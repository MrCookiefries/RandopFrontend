import { Button } from "@mui/material";
import "./App.scss";
import AppRoutes from "./AppRoutes";
import Theme from "./theme/Theme";
import { useDispatch } from "react-redux";
import themeActions from "./store/actions/themeActions";

const App = () => {
	const dispatch = useDispatch();
	const toggleMode = () => dispatch(themeActions.toggle());

	return (
		<div className="App">
			<Theme>
				<AppRoutes />
				<Button onClick={toggleMode} variant="outlined" color="secondary">
					hi
				</Button>
			</Theme>
		</div>
	);
};

export default App;
