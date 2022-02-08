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

	// load user token from local storage
	useEffect(() => {
		dispatch(userActions.loadSavedToken());
	}, [dispatch]);

	// fetch the user data
	useEffect(() => {
		// don't load if not logged in
		if (!user.token) return;
		const { id } = jwt.decode(user.token);
		// only fetch if it's a different user
		if (id !== user.id) {
			dispatch(userActions.fetchUser(id, user.token));
		}
		// create a stripe customer if not one
		if (!user.stripeId) {
			// don't make one of an unloaded user
			if (!user.email) return;
			dispatch(userActions.makeCustomer(user));
		}
	}, [dispatch, user]);

	return (
		<div>
			<Theme>
				<Paper
					elevation={0}
					sx={{
						bgcolor: "text.primary",
					}}
				>
					<AppRoutes />
				</Paper>
			</Theme>
		</div>
	);
};

export default App;
