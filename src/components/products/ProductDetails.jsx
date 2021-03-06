import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import productActions from "../../store/actions/productActions";
import {
	Paper,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Grid,
	Container,
	Chip,
	Divider,
} from "@mui/material";
import formatPrice from "../../helpers/formatPrice";
import formatName from "../../helpers/formatName";
import AddToCartForm from "../forms/AddToCartForm";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { name, image, option1, option2, price } =
		useSelector((store) => store.products[id]) || {};
	const isLoggedIn = useSelector((store) => store.user.token);

	useEffect(() => {
		// don't refetch if product is already in memory
		if (option1 === undefined) dispatch(productActions.fetchOne(id));
	}, [dispatch, id, option1]);

	if (option1 === undefined) return <p>loading...</p>;

	return (
		<Container maxWidth="lg">
			<Paper elevation={6}>
				<Grid container p={2} columns={12}>
					<Grid item xs={12} sm={7} md={5} lg={4}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
								alignItems: "center",
							}}
						>
							<Typography mb={1} variant="body1">
								{formatName(name)}
							</Typography>
							<img width="300px" height="auto" src={image} alt={name} />
						</Box>
					</Grid>
					<Grid item xs={12} sm={5} md={7} lg={8}>
						<Box>
							<Box>
								<List>
									{option1 && (
										<ListItem>
											<ListItemText>{option1}</ListItemText>
										</ListItem>
									)}
									{option2 && (
										<ListItem>
											<ListItemText>{option2}</ListItemText>
										</ListItem>
									)}
									<Divider sx={{ mb: 1 }} textAlign="left">
										<Chip
											variant="outlined"
											color="secondary"
											label={formatPrice(price)}
										/>
									</Divider>
								</List>
							</Box>
							{isLoggedIn ? (
								<AddToCartForm price={price} id={id} />
							) : (
								<Typography color="warning" variant="body1">
									Please sign in to be able to add this product to your cart.
								</Typography>
							)}
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default ProductDetails;
