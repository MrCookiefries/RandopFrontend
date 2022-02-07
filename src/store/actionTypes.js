// create generators for various domains
const makeTypeCreator = domain => (name) => `${domain}/${name}`;

// themes
const makeTheme = makeTypeCreator("theme");
export const themeTypes = {
	toggle: makeTheme("toggle")
};

// active cart
const makeActiveCart = makeTypeCreator("activeCart");
export const activeCartTypes = {
	set: makeActiveCart("set")
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
	delete: makeProduct("delete"),
	loadMany: makeProduct("loadMany"),
	loadOne: makeProduct("loadOne"),
	loadAll: makeProduct("loadAll"),
};

// carts
const makeCart = makeTypeCreator("cart");
export const cartTypes = {
	delete: makeCart("delete"),
	loadOne: makeCart("loadOne"),
	loadAll: makeCart("loadAll")
};

// cart items
const makeCartItem = makeTypeCreator("cartItem");
export const cartItemTypes = {
	delete: makeCartItem("delete"),
	loadAll: makeCartItem("loadAll"),
	loadOne: makeCartItem("loadOne")
};

// orders
const makeOrder = makeTypeCreator("order");
export const orderTypes = {
	loadOne: makeOrder("loadOne"),
	loadAll: makeOrder("loadAll")
};

// messages
const makeMessage = makeTypeCreator("message");
export const messageTypes = {
	add: makeMessage("add"),
	delete: makeMessage("delete")
};
