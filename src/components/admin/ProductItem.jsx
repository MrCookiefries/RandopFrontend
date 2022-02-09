import formatPrice from "../../helpers/formatPrice";
import { Link as NavLink } from "react-router-dom";
import {
	Link,
	Button,
	Paper,
	Box,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import productActions from "../../store/actions/productActions";

const ProductItem = ({ id, name, image, price, option1, option2 }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const deleteProduct = () => {
		dispatch(productActions.remove(id));
	};

	return (
		<Paper elevation={14}>
			<Box
				p={2}
				sx={
					isMobile
						? {}
						: {
								display: "flex",
								flexWrap: "wrap",
								flex: 2,
								alignItems: "center",
								gap: isTablet ? 1 : 2,
						  }
				}
			>
				<Box sx={{ flex: 1 }}>
					<Typography
						align={isMobile ? "center" : "left"}
						variant="subtitle1"
						color="primary"
					>
						{id}
					</Typography>
				</Box>
				<Box sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}>
					<img width={100} height="auto" src={image} alt={name} />
				</Box>
				<Box>
					{option1 && (
						<Typography align={isMobile ? "center" : "left"} variant="body1">
							{option1}
						</Typography>
					)}
					{option2 && (
						<Typography align={isMobile ? "center" : "left"} variant="body1">
							{option2}
						</Typography>
					)}
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						gap: 1,
						flex: 3,
					}}
				>
					<Typography
						align={isMobile ? "center" : "left"}
						variant="body1"
						color="primary"
					>
						Price
					</Typography>
					<Typography align={isMobile ? "center" : "left"} variant="body1">
						{formatPrice(price)}
					</Typography>
				</Box>
				{isTablet ? (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Box>
							<Link
								component={NavLink}
								underline="none"
								to="update"
								state={{
									product: { id, name, image, price, option1, option2 },
								}}
							>
								<Button color="primary" variant="outlined">
									Edit
								</Button>
							</Link>
						</Box>
						<Box>
							<Button
								color="secondary"
								onClick={deleteProduct}
								variant="outlined"
							>
								Delete
							</Button>
						</Box>
					</Box>
				) : (
					<>
						<Box>
							<Link
								component={NavLink}
								underline="none"
								to="update"
								state={{
									product: { id, name, image, price, option1, option2 },
								}}
							>
								<Button color="primary" variant="outlined">
									Edit
								</Button>
							</Link>
						</Box>
						<Box>
							<Button
								color="secondary"
								onClick={deleteProduct}
								variant="outlined"
							>
								Delete
							</Button>
						</Box>
					</>
				)}
			</Box>
		</Paper>
	);
};

export default ProductItem;
