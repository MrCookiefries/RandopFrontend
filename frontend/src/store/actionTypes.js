// create generators for various domains
const makeTypeCreator = domain => (name) => `${domain}/${name}`;

// themes
const makeTheme = makeTypeCreator("theme");
export const themeTypes = {
	toggle: makeTheme("toggle")
};
