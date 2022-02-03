import { Paper } from "@mui/material";
import AppRoutes from "./AppRoutes";
import Theme from "./theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import userActions from "./store/actions/userActions";
import jwt from "jsonwebtoken";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	// fetch the user data
	useEffect(() => {
		// don't load if not logged in
		if (!user.token) return;
		const { id } = jwt.decode(user.token);
		// don't fetch if it's the same user
		if (id === user.id) return;
		dispatch(userActions.fetchUser(id, user.token));
	}, [dispatch, user]);

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
