// return a create theme palette object of colors
// colors are different based on the mode
// light or dark
const getPalette = (mode) => ({
	mode,
	...(mode === "light"
		// light
		? {
			primary: {
				main: "#23a4a4"
			},
			secondary: {
				main: "#d326d9"
			}
		}
		// dark
		: {
			primary: {
				main: "#52dada"
			},
			secondary: {
				main: "#e47de8"
			}
		}
	)
});

export default getPalette;
