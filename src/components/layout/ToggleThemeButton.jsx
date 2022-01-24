import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import themeActions from "../../store/actions/themeActions";

const ToggleThemeButton = () => {
	const { isDark } = useSelector((store) => store.theme);
	const dispatch = useDispatch();
	const toggleMode = () => dispatch(themeActions.toggle());

	return (
		<IconButton onClick={toggleMode}>
			{isDark ? <Brightness7 /> : <Brightness4 />}
		</IconButton>
	);
};

export default ToggleThemeButton;
