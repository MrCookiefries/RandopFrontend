import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
	const isLoggedIn = useSelector((store) => store.user.token);

	return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
