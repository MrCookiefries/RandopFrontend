// create generators for various domains
const makeTypeCreator = domain => (name) => `${domain}/${name}`;

// themes
const makeTheme = makeTypeCreator("theme");
export const themeTypes = {
	toggle: makeTheme("toggle")
};

// users
const makeUser = makeTypeCreator("user");
export const userTypes = {
	load: makeUser("load"),
	logout: makeUser("logout")
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

// messages
const makeMessage = makeTypeCreator("message");
export const messageTypes = {
	add: makeMessage("add"),
	delete: makeMessage("delete")
};
