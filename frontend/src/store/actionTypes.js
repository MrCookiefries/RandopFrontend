// create generators for various domains
const makeTypeCreator = domain => (name) => `${domain}/${name}`;

// themes
const makeTheme = makeTypeCreator("theme");
export const themeTypes = {
	toggle: makeTheme("toggle")
};

// products
const makeProduct = makeTypeCreator("product");
export const productTypes = {
	add: makeProduct("add"),
	update: makeProduct("update"),
	delete: makeProduct("delete"),
	loadMany: makeProduct("loadMany"),
	loadOne: makeProduct("loadOne")
};
