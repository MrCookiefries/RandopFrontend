// return a create theme palette object of colors
// colors are different based on the mode
// light or dark
const getPalette = (mode) => ({
	mode,
	...(mode === "light"
		// light
		? {

		}
		// dark
		: {

		}
	)
});

export default getPalette;
