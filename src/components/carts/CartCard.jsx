import { useDispatch } from "react-redux";
import {
	Link,
	Paper,
	Button,
	ButtonGroup,
	Typography,
	Box,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import cartActions from "../../store/actions/cartActions";
import activeCartActions from "../../store/actions/activeCartActions";
import cartItemActions from "../../store/actions/cartItemActions";

const CartCard = ({ id, activeId }) => {
	const dispatch = useDispatch();

	const deleteCart = () => {
		dispatch(cartActions.remove(id));
	};

	const setActive = () => {
		dispatch(activeCartActions.set(id));
		dispatch(cartItemActions.fetchAll(id));
	};

	const handleClick = () => {
		window.scrollTo({ top: 0 });
	};

	return (
		<Box sx={{ minWidth: "300px" }}>
			<Paper elevation={12}>
				<Box p={2}>
					<Typography variant="h5" gutterBottom>
						Cart number: {id}
					</Typography>
					<ButtonGroup variant="contained" size="small">
						<Button onClick={setActive} disabled={activeId === id}>
							{activeId === id ? "Already Active" : "Set Active"}
						</Button>
						<Button color="secondary" onClick={deleteCart}>
							Delete
						</Button>
					</ButtonGroup>
					<Link
						onClick={handleClick}
						color="info.main"
						component={NavLink}
						to={id}
					>
						<Typography variant="body1" mt={1}>
							View Details
						</Typography>
					</Link>
				</Box>
			</Paper>
		</Box>
	);
};

export default CartCard;
