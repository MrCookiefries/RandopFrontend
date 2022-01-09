import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import getPalette from "./getPalette";
import { useSelector } from "react-redux";

const Theme = ({ children }) => {
	const storeTheme = useSelector((store) => store.theme);
	const mode = storeTheme.isDark ? "dark" : "light";

	const theme = useMemo(
		() =>
			createTheme({
				palette: getPalette(mode),
			}),
		[mode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default Theme;
