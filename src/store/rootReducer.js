import { combineReducers } from "redux";
import theme from "./reducers/themeReducer";
import products from "./reducers/productReducer";
import user from "./reducers/userReducer";
import messages from "./reducers/messageReducer";

const rootReducer = combineReducers({ theme, products, user, messages });

export default rootReducer;
