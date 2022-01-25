import { Container, Paper, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../store/actions/productActions";
import ProductInfo from "./ProductInfo";
import ProductShow from "./ProductShow";

const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((store) => store.products);

	// select a random product to showcase
	const productIds = Object.keys(products);
	const { length } = productIds;
	const productId = productIds[Math.floor(Math.random() * length)];
	const product = products[productId];

	useEffect(() => {
		// don't refetch if a product is already in memory
		if (length) return;
		const ranNum = Math.floor(Math.random() * 300) + 1;
		dispatch(productActions.fetchMany(1, ranNum));
	}, [dispatch, length]);

	// determine if small breakpoint is hit or not
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<section>
			{product ? (
				<Container sx={{ my: 4 }} maxWidth="md">
					<Grid container sx={{ justifyContent: "center" }} columns={10}>
						<Grid item xs={10} sm={8} md={5}>
							<Paper
								sx={{
									height: "100%",
									bgcolor: "primary.main",
									color: "primary.contrastText",
									borderRadius: `${isSmall ? "4px 4px 0 0" : "4px 0 0 4px"}`,
								}}
								elevation={4}
							>
								<ProductShow {...product} isSmall={isSmall} />
							</Paper>
						</Grid>
						<Grid item xs={10} sm={8} md={5}>
							<Paper
								sx={{
									height: "100%",
									borderRadius: `${isSmall ? "0 0 4px 4px" : "0 4px 4px 0"}`,
								}}
								elevation={4}
							>
								<ProductInfo {...product} isSmall={isSmall} />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			) : (
				<p>loading...</p>
			)}
		</section>
	);
};

export default Home;
