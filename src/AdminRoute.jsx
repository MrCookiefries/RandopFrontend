import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
	const { isAdmin } = useSelector((store) => store.user);

	return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
