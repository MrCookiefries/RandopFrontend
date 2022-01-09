import { combineReducers } from "redux";
import theme from "./reducers/themeReducer";
import products from "./reducers/productReducer";

const rootReducer = combineReducers({ theme, products });

export default rootReducer;
