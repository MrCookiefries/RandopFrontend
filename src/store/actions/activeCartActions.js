import { activeCartTypes } from "../actionTypes";

const activeCartActions = {
	set: cartId => ({ type: activeCartTypes.set, payload: cartId })
};

export default activeCartActions;
