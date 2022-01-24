import "./App.scss";
import AppRoutes from "./AppRoutes";
import Theme from "./theme/Theme";
import { useDispatch } from "react-redux";
import background from "./assets/background.svg";
import { useEffect } from "react";
import userActions from "./store/actions/userActions";
// SVG from ^ https://www.svgbackgrounds.com/

const App = () => {
	const dispatch = useDispatch();

	// load user token from local storage
	useEffect(() => {
		dispatch(userActions.loadSavedToken());
	}, [dispatch]);

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
				<AppRoutes />
			</Theme>
		</div>
	);
};

export default App;
