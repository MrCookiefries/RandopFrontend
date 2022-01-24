import { Container, Paper, Grid, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../store/actions/productActions";
import DownloadCsv from "../products/DownloadCsv";
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

	return (
		<section>
			{product ? (
				<Container sx={{ my: 4 }} maxWidth="md">
					<Grid container columns={{ md: 2 }}>
						<Grid sx={{ flex: 1 }} item md={1}>
							<Paper
								sx={{
									height: "100%",
									bgcolor: "primary.main",
									color: "primary.contrastText",
								}}
								elevation={4}
							>
								<ProductShow {...product} />
							</Paper>
						</Grid>
						<Grid sx={{ flex: 1 }} item md={1}>
							<Paper sx={{ height: "100%" }} elevation={4}>
								<ProductInfo {...product} />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			) : (
				<p>loading...</p>
			)}
			<DownloadCsv />
		</section>
	);
};

export default Home;
