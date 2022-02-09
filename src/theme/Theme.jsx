import { CssBaseline } from "@mui/material";
import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles";
import { useMemo } from "react";
import getPalette from "./getPalette";
import { useSelector } from "react-redux";

const Theme = ({ children }) => {
	const storeTheme = useSelector((store) => store.theme);
	const mode = storeTheme.isDark ? "dark" : "light";

	const theme = useMemo(() => {
		const titleFont = {
			fontFamily: ["Merriweather", "serif"].join(","),
		};
		const textFont = {
			fontFamily: ["Roboto", "sans-serif"].join(","),
		};

		return responsiveFontSizes(
			createTheme({
				palette: getPalette(mode),
				typography: {
					fontFamily: textFont.fontFamily,
					h1: titleFont,
					h2: titleFont,
					h3: titleFont,
					h4: titleFont,
					h5: titleFont,
					h6: titleFont,
					subtitle1: titleFont,
					subtitle2: titleFont,
					button: {
						textTransform: "none",
						...titleFont,
					},
				},
			})
		);
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default Theme;
