import { combineReducers } from "redux";
import theme from "./reducers/themeReducer";
import products from "./reducers/productReducer";
import user from "./reducers/userReducer";
import messages from "./reducers/messageReducer";
import carts from "./reducers/cartReducer";
import cartItems from "./reducers/cartItemReducer";

const rootReducer = combineReducers({
	theme,
	products,
	user,
	messages,
	carts,
	cartItems
});

export default rootReducer;
