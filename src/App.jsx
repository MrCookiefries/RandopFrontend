import { Paper } from "@mui/material";
import AppRoutes from "./AppRoutes";
import Theme from "./theme/Theme";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import userActions from "./store/actions/userActions";

const App = () => {
	const dispatch = useDispatch();

	// load user token from local storage
	useEffect(() => {
		dispatch(userActions.loadSavedToken());
	}, [dispatch]);

	return (
		<div>
			<Theme>
				<Paper
					elevation={0}
					sx={{
						bgcolor: "primary.main",
					}}
				>
					<AppRoutes />
				</Paper>
			</Theme>
		</div>
	);
};

export default App;
